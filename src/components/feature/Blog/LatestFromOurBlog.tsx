import { getAllPosts } from "@/lib/mdx";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaRegClock, FaRegNewspaper } from "react-icons/fa";

export const LatestFromOurBlog = () => {
  // Get 3 recent blog posts
  const posts = getAllPosts()
    .filter((post) => post.frontmatter.status === "published")
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
    .slice(0, 3);

  return (
    <>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl flex items-center justify-center">
          <FaRegNewspaper className="text-blue-500 mr-3" />
          Latest from Our Blog
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Expert insights to help you navigate your financial journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.frontmatter.thumbnailUrl || "/Calqulation.png"}
                  alt={post.frontmatter.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                {post.frontmatter.category && (
                  <div className="absolute bottom-0 left-0 m-3">
                    <span className="inline-block bg-blue-500/80 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                      {post.frontmatter.category}
                    </span>
                  </div>
                )}
              </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 mb-3">
                  {post.frontmatter.title}
                </h3>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">
                {post.frontmatter.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <FaRegClock className="mr-1" />
                  {post.frontmatter.date &&
                    moment(new Date(post.frontmatter.date)).format(
                      "MMM D, YYYY"
                    )}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center"
                >
                  Read more <FaArrowRight className="ml-1 text-xs" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/blog"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300"
        >
          View All Articles
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </>
  );
};
