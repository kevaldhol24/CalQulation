import { BlogCustomLayout } from "@/components/feature/Blog/BlogCustomLayout";
import BlogPagination from "@/components/feature/Blog/BlogPagination";
import BlogPostCard from "@/components/feature/Blog/BlogPostCard";
import FeaturedPost from "@/components/feature/Blog/FeaturedPost";
import { DEFAULT_BLOG_PAGINATION_SIZE } from "@/lib/constants";
import { getAllPosts, getNameFromSlug } from "@/lib/mdx";
import { Metadata } from "next";
import { FaSearch } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Blog | Calqulation",
  description: "Explore financial tips, guides, and insights on our blog.",
};

interface BlogIndexProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    tag?: string;
    size?: string;
  }>;
}

export default async function BlogIndex({ searchParams }: BlogIndexProps) {
  const {
    category,
    tag,
    size = DEFAULT_BLOG_PAGINATION_SIZE.toString(),
    search,
  } = await searchParams;
  const posts = getAllPosts();
  const pageSize = parseInt(size, 10);

  // Filter posts based on search parameters
  const publishedPosts = posts.filter((post) => {
    // If no filters are provided, include all posts
    if (!category && !tag && !search) return true;

    // Filter by category
    if (
      category &&
      (!post.frontmatter.category ||
        post.frontmatter.category.toLowerCase() !==
          getNameFromSlug(category).toLowerCase())
    ) {
      return false;
    }

    // Filter by tag
    if (
      tag &&
      (!post.frontmatter.tags ||
        !post.frontmatter.tags.some(
          (t) => t.toLowerCase() === getNameFromSlug(tag).toLowerCase()
        ))
    ) {
      return false;
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        (post.frontmatter.title &&
          post.frontmatter.title.toLowerCase().includes(searchLower)) ||
        (post.frontmatter.description &&
          post.frontmatter.description.toLowerCase().includes(searchLower))
      );
    }

    return true;
  });

  const getLabel = () => {
    if (category) {
      return `${getNameFromSlug(category)} Articles`;
    }
    if (tag) {
      return `${getNameFromSlug(tag)} Articles`;
    }
    if (search) {
      return `Search Results for: "${search}"`;
    }
    return "Latest Articles";
  };

  // Limit the number of posts based on size parameter
  const filteredPosts = [...publishedPosts].slice(0, pageSize);

  // Get featured post and categorize remaining posts
  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <BlogCustomLayout>
      <div className="mb-5 flex flex-col md:flex-row justify-between items-center gap-3">
        <h2 className="text-xl font-bold text-foreground relative">
          {getLabel()}
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
                No posts found
              </h3>
              <p className="text-muted-foreground text-sm">
                Check back soon for new content or subscribe to our newsletter!
              </p>
            </div>
          </>
        )}
      </div>

      <BlogPagination hasMore={publishedPosts.length > pageSize} />
    </BlogCustomLayout>
  );
}
