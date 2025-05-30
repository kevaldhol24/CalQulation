import { Post } from "@/lib/types/blog";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineClock } from "react-icons/hi";
import moment from "moment";

interface BlogPostCardProps {
  post: Post;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const { slug, frontmatter } = post;

  return (
    <div className="bg-card dark:bg-gray-800/40 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full group">
      <Link href={`/blog/${slug}`}>
        <div className="relative h-40 overflow-hidden">
          <Image
            src={frontmatter.thumbnailUrl || "/Calqulation.png"}
            alt={frontmatter.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {frontmatter.category && (
            <div className="absolute bottom-0 left-0 m-3">
              <span className="inline-block bg-primary/80 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                {frontmatter.category}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/blog/${slug}`}>
          <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-1.5 line-clamp-2">
            {frontmatter.title}
          </h2>
        </Link>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-2 flex-grow">
          {frontmatter.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="text-xs text-muted-foreground flex items-center">
            <HiOutlineClock className="mr-1" />
            {frontmatter.date && moment(new Date(frontmatter.date)).format("MMM d, yyyy")}
          </div>

          <Link
            href={`/blog/${slug}`}
            className="text-xs font-medium text-primary hover:underline flex items-center"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}
