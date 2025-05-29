import { PageHero } from "@/components/common/PageHero";
import { compileMDXContent, getAllPosts, getPostBySlug } from "@/lib/mdx";
import moment from "moment";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate static paths for all blog posts
export async function generateStaticParams() {
  try {
    const posts = getAllPosts();

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    return {
      title: `${post.frontmatter.title} | Calqulation`,
      description: post.frontmatter.description,
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        images: post.frontmatter.thumbnailUrl
          ? [post.frontmatter.thumbnailUrl]
          : [],
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
    return {
      title: "Blog Post | Calqulation",
      description: "Financial calculators and resources",
    };
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    // Compile the MDX content
    const { content } = await compileMDXContent(post.content);

    const postFrontmatter = post.frontmatter;

    return (
      <div className="blog-post-container">
        <PageHero
          title={postFrontmatter.title}
          subtitle={postFrontmatter.description}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Post metadata */}
            <div className="mb-6 text-sm text-gray-500">
              {postFrontmatter.date && (
                <time dateTime={postFrontmatter.date}>
                  {moment(postFrontmatter.date).format("MMMM d, yyyy")}
                </time>
              )}

              {postFrontmatter.category && <span className="mx-2">·</span>}

              {postFrontmatter.category && (
                <Link
                  href={`/blog/category/${postFrontmatter.category.toLowerCase()}`}
                  className="text-primary hover:underline"
                >
                  {postFrontmatter.category}
                </Link>
              )}

              {postFrontmatter.author && <span className="mx-2">·</span>}

              {postFrontmatter.author && (
                <span>By {postFrontmatter.author}</span>
              )}
            </div>

            {/* Featured image */}
            {postFrontmatter.thumbnailUrl && (
              <div className="mb-8">
                <Image
                  src={postFrontmatter.thumbnailUrl}
                  alt={postFrontmatter.title}
                  width={800}
                  height={450}
                  className="rounded-lg w-full"
                />
              </div>
            )}

            {/* MDX content */}
            <article className="prose prose-lg max-w-none">{content}</article>

            {/* Tags */}
            {postFrontmatter.tags && postFrontmatter.tags.length > 0 && (
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {postFrontmatter.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag.toLowerCase()}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-primary hover:text-white transition"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering blog post:", error);
    notFound();
  }
}
