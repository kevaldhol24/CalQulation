import { BlogCustomLayout } from "@/components/feature/Blog/BlogCustomLayout";
import { Button } from "@/components/ui/button";
import {
  compileMDXContent,
  generateSlug,
  getAllPosts,
  getPostBySlug,
} from "@/lib/mdx";
import moment from "moment";
import type { Metadata } from "next";
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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    const frontmatter = post.frontmatter;

    // Construct canonical URL
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.calqulation.com";
    const canonicalUrl = frontmatter.canonical || `${baseUrl}/blog/${slug}`;

    // Calculate reading time if not provided
    const readingTime =
      frontmatter.readingTime ||
      Math.ceil(post.content.split(/\s+/).length / 200); // Estimate based on word count

    // Prepare structured data for JSON-LD
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: frontmatter.title,
      description: frontmatter.excerpt || frontmatter.description,
      image:
        frontmatter.ogImage ||
        frontmatter.thumbnailUrl ||
        `${baseUrl}/images/default-og.jpg`,
      datePublished: frontmatter.date,
      dateModified: frontmatter.lastModified || frontmatter.date,
      author: {
        "@type": "Person",
        name:
          frontmatter.structuredData?.authorName ||
          frontmatter.author ||
          "Calqulation Team",
        url: frontmatter.structuredData?.authorUrl || `${baseUrl}/about-us`,
      },
      publisher: {
        "@type": "Organization",
        name: frontmatter.structuredData?.publisherName || "Calqulation",
        logo: {
          "@type": "ImageObject",
          url:
            frontmatter.structuredData?.publisherLogo ||
            `${baseUrl}/Calqulation.png`,
        },
      },
      mainEntityOfPage: canonicalUrl,
    };

    return {
      title: `${frontmatter.title} | Calqulation`,
      description: frontmatter.excerpt || frontmatter.description,
      keywords: frontmatter.keywords || frontmatter.tags?.join(", "),

      // Canonical URL
      alternates: {
        canonical: canonicalUrl,
        languages:
          frontmatter.alternateLanguages?.reduce(
            (acc, alt) => ({ ...acc, [alt.locale]: alt.url }),
            {}
          ) || {},
      },
      // Open Graph metadata
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.excerpt || frontmatter.description,
        url: canonicalUrl,
        siteName: "Calqulation",
        images: frontmatter.ogImage
          ? [{ url: frontmatter.ogImage, alt: frontmatter.title }]
          : frontmatter.thumbnailUrl
          ? [{ url: frontmatter.thumbnailUrl, alt: frontmatter.title }]
          : [],
        type: (frontmatter.ogType as "article" | "website") || "article",
        publishedTime: frontmatter.date,
        modifiedTime: frontmatter.lastModified,
        authors: frontmatter.author
          ? [frontmatter.author]
          : ["Calqulation Team"],
        tags: frontmatter.tags || [],
      },

      // Twitter metadata
      twitter: {
        card: frontmatter.twitterCard || "summary_large_image",
        title: frontmatter.title,
        description: frontmatter.excerpt || frontmatter.description,
        images: frontmatter.ogImage
          ? [frontmatter.ogImage]
          : frontmatter.thumbnailUrl
          ? [frontmatter.thumbnailUrl]
          : undefined,
        creator: frontmatter.twitterCreator || "@calqulation",
      },

      // Robots control
      robots: frontmatter.noIndex
        ? {
            index: false,
            follow: false,
          }
        : {
            index: true,
            follow: true,
          },

      // Structured data
      other: {
        "reading-time": String(readingTime),
        "article:published_time": frontmatter.date,
        "article:modified_time": frontmatter.lastModified || frontmatter.date,
        "article:author": frontmatter.author || "Calqulation Team",
        "article:section": frontmatter.category || "Finance",
        "article:tag": frontmatter.tags?.join(",") || "",
        "structured-data": JSON.stringify(structuredData),
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post | Calqulation",
      description: "Financial calculators and resources",
    };
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    // Compile the MDX content
    const { content } = await compileMDXContent(post.content);

    const postFrontmatter = post.frontmatter;

    // Create JSON-LD structured data
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.calqulation.com";
    const canonicalUrl = postFrontmatter.canonical || `${baseUrl}/blog/${slug}`;
    const readingTime =
      postFrontmatter.readingTime ||
      Math.ceil(post.content.split(/\s+/).length / 200);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: postFrontmatter.title,
      description: postFrontmatter.excerpt || postFrontmatter.description,
      image:
        postFrontmatter.ogImage ||
        postFrontmatter.thumbnailUrl ||
        `${baseUrl}/images/default-og.jpg`,
      datePublished: postFrontmatter.date,
      dateModified: postFrontmatter.lastModified || postFrontmatter.date,
      author: {
        "@type": "Person",
        name:
          postFrontmatter.structuredData?.authorName ||
          postFrontmatter.author ||
          "Calqulation Team",
        url: postFrontmatter.structuredData?.authorUrl || `${baseUrl}/about-us`,
      },
      publisher: {
        "@type": "Organization",
        name: postFrontmatter.structuredData?.publisherName || "Calqulation",
        logo: {
          "@type": "ImageObject",
          url:
            postFrontmatter.structuredData?.publisherLogo ||
            `${baseUrl}/Calqulation.png`,
        },
      },
      mainEntityOfPage: canonicalUrl,
      wordCount: post.content.split(/\s+/).length,
      timeRequired: `PT${readingTime}M`,
      keywords:
        postFrontmatter.keywords || postFrontmatter.tags?.join(", ") || "",
      articleSection: postFrontmatter.category || "Finance",
    };
    return (
      <BlogCustomLayout slug={slug}>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="blog-post-container">
          <div className="container mx-auto">
            <div className="">
              <div className="mb-5 flex flex-col md:flex-row justify-between items-center gap-3">
                <h2 className="text-2xl font-bold text-foreground relative">
                  {postFrontmatter.title}
                  <span className="absolute -bottom-1 left-0 w-20 h-0.5 bg-primary rounded-full"></span>
                </h2>
              </div>
              {/* Post metadata */}{" "}
              <div className="mb-6 text-sm text-gray-500">
                {postFrontmatter.date && (
                  <time dateTime={postFrontmatter.date} className="mr-2">
                    {moment(postFrontmatter.date).format("MMMM d, yyyy")}
                  </time>
                )}

                {/* Show last modified date if available */}
                {postFrontmatter.lastModified &&
                  postFrontmatter.lastModified !== postFrontmatter.date && (
                    <>
                      <span className="mx-1">•</span>
                      <span className="mr-2" title="Last updated">
                        Updated:&nbsp;
                        {moment(postFrontmatter.lastModified).format(
                          "MMMM d, yyyy"
                        )}
                      </span>
                    </>
                  )}

                {postFrontmatter.category && <span className="mx-2">·</span>}

                {postFrontmatter.category && (
                  <Link
                    href={`/blog?category=${generateSlug(
                      postFrontmatter.category
                    )}`}
                    className="text-primary hover:underline"
                  >
                    {postFrontmatter.category}
                  </Link>
                )}

                {postFrontmatter.author && <span className="mx-2">·</span>}

                {postFrontmatter.author && (
                  <span>By {postFrontmatter.author}</span>
                )}

                {/* Display estimated reading time */}
                <span className="mx-2">·</span>
                <span title="Estimated reading time">
                  {postFrontmatter.readingTime ||
                    Math.ceil(post.content.split(/\s+/).length / 200)}&nbsp;
                  min read
                </span>
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
                <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
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
                        <Link href={`/blog?tag=${generateSlug(tag)}`}>
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
