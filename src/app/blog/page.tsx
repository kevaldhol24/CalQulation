import { BlogCustomLayout } from "@/components/feature/Blog/BlogCustomLayout";
import BlogPostCard from "@/components/feature/Blog/BlogPostCard";
import FeaturedPost from "@/components/feature/Blog/FeaturedPost";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/mdx";
import { Metadata } from "next";
import { FaSearch } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Blog | Calqulation",
  description: "Explore financial tips, guides, and insights on our blog.",
};

interface BlogIndexProps {
  searchParams: {
    search?: string;
  };
}

export default function BlogIndex({ searchParams }: BlogIndexProps) {
  const search = searchParams?.search || null;
  const posts = getAllPosts();

  let publishedPosts = posts;
  if (search) {
    publishedPosts = posts.filter(
      (post) =>
        post.frontmatter.title.toLowerCase().includes(search.toLowerCase()) ||
        post.frontmatter.description
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }

  // Get featured post and categorize remaining posts
  const featuredPost = publishedPosts[0];
  const regularPosts = publishedPosts.slice(1);

  return (
    <BlogCustomLayout>
      <div className="mb-5 flex flex-col md:flex-row justify-between items-center gap-3">
        <h2 className="text-xl font-bold text-foreground relative">
          {search ? `Search Results of "${search}"` : "Latest Articles"}
          <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-primary rounded-full"></span>
        </h2>
      </div>
      {featuredPost && <FeaturedPost post={featuredPost} />}

      {/* Compact Recent articles headline */}
      {regularPosts.length > 0 && (
        <div className="flex items-center mb-5 mt-5">
          <h3 className="text-base font-bold text-foreground">
            Recent Articles
          </h3>
          <div className="ml-3 flex-grow h-px bg-gray-200 dark:bg-gray-800"></div>
        </div>
      )}

      {/* Regular Blog Posts in Grid - with smaller gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {regularPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}

        {publishedPosts.length === 0 && (
          <>
            <h3 className="col-span-3 text-xs uppercase tracking-wider text-primary font-semibold flex items-center">
              <span className="mr-2">✦</span>
              <span>Articles</span>
              <span className="flex-grow border-b border-gray-200 dark:border-gray-800 ml-4"></span>
            </h3>
            <div className="col-span-3 bg-card dark:bg-gray-800/60 rounded-xl px-8 py-22 text-center border border-gray-100 dark:border-gray-700">
              <div className="inline-flex items-center justify-center p-2.5 bg-primary/10 rounded-full mb-3">
                <FaSearch className="text-primary text-lg" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1.5">
                No blog posts found
              </h3>
              <p className="text-muted-foreground text-sm">
                Check back soon for new content or subscribe to our newsletter!
              </p>
            </div>
          </>
        )}
      </div>

      {/* Load More Button - more compact */}
      {publishedPosts.length > 0 && (
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="rounded-full px-6 py-1 h-9 text-sm"
          >
            Load More Articles
          </Button>
        </div>
      )}
    </BlogCustomLayout>
  );
}
