import { Post } from "@/lib/types/blog";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineClock } from "react-icons/hi";
import moment from "moment";

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const { slug, frontmatter } = post;
  
  return (
    <div className="lg:col-span-8">
      <h3 className="text-xs uppercase tracking-wider text-primary font-semibold mb-3 flex items-center">
        <span className="mr-2">✦</span>
        <span>Editor&apos;s Pick</span>
        <span className="flex-grow border-b border-gray-200 dark:border-gray-800 ml-4"></span>
      </h3>
      <div className="bg-card dark:bg-gray-800/40 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={frontmatter.thumbnailUrl || "/Calqulation.png"}
            alt={frontmatter.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
            <div className="absolute bottom-0 left-0 p-6">
              {frontmatter.category && (
                <Link
                  href={`/blog?category=${frontmatter.category.toLowerCase()}`}
                  className="inline-block text-xs font-bold bg-primary/90 text-white uppercase tracking-wider px-2 py-0.5 rounded-full mb-3"
                >
                  {frontmatter.category}
                </Link>
              )}
              <Link href={`/blog/${slug}`}>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 hover:text-blue-200 transition-colors duration-200">
                  {frontmatter.title}
                </h2>
              </Link>
              <div className="flex items-center text-xs text-gray-200">
                <HiOutlineClock className="mr-1" />
                {frontmatter.date && moment(new Date(frontmatter.date)).format("MMM d, yyyy")}
                {/* <span className="mx-2">•</span> */}
                {/* <span>5 min read</span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-muted-foreground text-sm line-clamp-2">
            {frontmatter.description}
          </p>
          <div className="mt-3 flex justify-end">
            <Link
              href={`/blog/${slug}`}
              className="text-xs font-semibold text-primary hover:underline flex items-center"
            >
              Continue reading →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
