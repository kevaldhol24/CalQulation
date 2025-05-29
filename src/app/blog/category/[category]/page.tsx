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
  const categories = new Set<string>();

  posts.forEach((post) => {
    if (post.frontmatter.category) {
      categories.add(post.frontmatter.category.toLowerCase());
    }
  });

  return Array.from(categories).map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const { category } = await params;

  return {
    title: `${
      category.charAt(0).toUpperCase() + category.slice(1)
    } | Blog | Calqulation`,
    description: `Browse all articles in the ${category} category`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const allPosts = getAllPosts();

  // Filter posts by category
  const categoryPosts = allPosts.filter(
    (post) =>
      post.frontmatter.category?.toLowerCase() === category.toLowerCase()
  );

  if (categoryPosts.length === 0) {
    notFound();
  }

  return (
    <div>
      <PageHero
        title={`${categoryName} Posts`}
        subtitle={`Browse all our articles in the ${categoryName} category`}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryPosts.map((post) => (
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
