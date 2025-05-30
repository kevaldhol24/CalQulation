import { BlogCustomLayout } from "@/components/feature/Blog/BlogCustomLayout";
import { Button } from "@/components/ui/button";
import {
  compileMDXContent,
  generateSlug,
  getAllPosts,
  getPostBySlug,
} from "@/lib/mdx";
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
      <BlogCustomLayout slug={slug}>
        <div className="blog-post-container">
          <div className="container mx-auto">
            <div className="">
              <div className="mb-5 flex flex-col md:flex-row justify-between items-center gap-3">
                <h2 className="text-xl font-bold text-foreground relative">
                  {postFrontmatter.title}
                  <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-primary rounded-full"></span>
                </h2>
              </div>
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
                <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {postFrontmatter.tags.map((tag) => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs h-6 py-0 px-2.5"
                      >
                        <Link href={`/blog/tag/${generateSlug(tag)}`}>
                          {tag}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {!!postFrontmatter.relatedPosts?.length && (
                <h3 className="text-xs uppercase tracking-wider text-primary font-semibold mb-4 mt-12 flex items-center">
                  <span className="mr-2">✦</span>
                  <span>You may also like</span>
                  <span className="flex-grow border-b border-gray-200 dark:border-gray-800 ml-4"></span>
                </h3>
              )}
              {!!postFrontmatter.relatedPosts?.length &&
                postFrontmatter.relatedPosts.map((relatedPost) => {
                  const relatedPostData = getPostBySlug(relatedPost);
                  return (
                    <div
                      key={relatedPost}
                      className="mb-4 flex items-start gap-4 p-2 border bg-card dark:bg-gray-800/40 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-gray-100 dark:border-gray-700"
                    >
                      <Link
                        href={`/blog/${relatedPost}`}
                        className="text-primary hover:underline"
                      >
                        <Image
                          src={relatedPostData.frontmatter.thumbnailUrl || ""}
                          alt={relatedPostData.frontmatter.title}
                          width={160}
                          height={115}
                          className="rounded-md min-w-[160px]"
                        />
                      </Link>
                      <div>
                        <Link
                          href={`/blog/${relatedPost}`}
                          className="hover:underline truncate-multiline-2"
                        >
                          {relatedPostData.frontmatter.title}
                        </Link>
                        <p className="text-sm text-gray-500 truncate-multiline-2">
                          {relatedPostData.frontmatter.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </BlogCustomLayout>
    );
  } catch (error) {
    console.error("Error rendering blog post:", error);
    notFound();
  }
}
