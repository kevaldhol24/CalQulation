import { getAllPosts } from "@/lib/mdx";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/PageHero";
import { Post } from "@/lib/types/blog";
import moment from "moment";

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

  return {
    title: `${tag.charAt(0).toUpperCase() + tag.slice(1)} | Blog | Calqulation`,
    description: `Browse all articles tagged with ${tag}`,
  };
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = await params;
  const tagName = tag.charAt(0).toUpperCase() + tag.slice(1);
  const allPosts = getAllPosts();

  // Filter posts by tag
  const tagPosts = allPosts.filter((post) =>
    post.frontmatter.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );

  if (tagPosts.length === 0) {
    notFound();
  }

  return (
    <div>
      <PageHero
        title={`Posts Tagged "${tagName}"`}
        subtitle={`Browse all our articles tagged with ${tagName}`}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tagPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogPostCard({ post }: { post: Post }) {
  const { slug, frontmatter } = post;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/blog/${slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={frontmatter.thumbnailUrl || "/Calqulation.png"}
            alt={frontmatter.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-5">
        {frontmatter.category && (
          <Link
            href={`/blog/category/${frontmatter.category.toLowerCase()}`}
            className="text-xs font-medium text-primary uppercase tracking-wider hover:underline"
          >
            {frontmatter.category}
          </Link>
        )}

        <Link href={`/blog/${slug}`}>
          <h2 className="mt-2 text-xl font-bold text-gray-900 hover:text-primary transition-colors duration-200">
            {frontmatter.title}
          </h2>
        </Link>

        <p className="mt-2 text-gray-600 line-clamp-2">
          {frontmatter.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {frontmatter.date &&
              moment(new Date(frontmatter.date)).format("MMM d, yyyy")}
          </div>

          <Link
            href={`/blog/${slug}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}
