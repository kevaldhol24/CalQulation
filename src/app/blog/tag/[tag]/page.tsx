import { BlogCustomLayout } from "@/components/feature/Blog/BlogCustomLayout";
import BlogPostCard from "@/components/feature/Blog/BlogPostCard";
import FeaturedPost from "@/components/feature/Blog/FeaturedPost";
import { getAllPosts, getNameFromSlug, getPostsByTag } from "@/lib/mdx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach((tag) => {
        tags.add(tag.toLowerCase());
      });
    }
  });

  return Array.from(tags).map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const { tag } = await params;
  const tagName = getNameFromSlug(tag);
  return {
    title: `${tagName} | Blog | Calqulation`,
    description: `Browse all articles tagged with ${tagName}`,
  };
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = await params;
  const tagName = getNameFromSlug(tag);

  // Filter posts by tag
  const tagPosts = getPostsByTag(tag);

  if (tagPosts.length === 0) {
    notFound();
  }

  return (
    <BlogCustomLayout>
      <div>
        <div className="mb-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <h2 className="text-xl font-bold text-foreground relative">
            {tagName} Articles
            <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-primary rounded-full"></span>
          </h2>
        </div>
        <FeaturedPost post={tagPosts[0]} />
        <div className="flex items-center mb-5 mt-5">
          <h3 className="text-base font-bold text-foreground">
            Recent Articles
          </h3>
          <div className="ml-3 flex-grow h-px bg-gray-200 dark:bg-gray-800"></div>
        </div>
        <div className="container ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tagPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </BlogCustomLayout>
  );
}
