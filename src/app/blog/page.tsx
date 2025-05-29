import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/mdx";
import { Post } from "@/lib/types/blog";
import moment from "moment";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";

import { IoNewspaperOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Blog | Calqulation",
  description: "Explore financial tips, guides, and insights on our blog.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  // Filter out draft posts in production
  const publishedPosts =
    process.env.NODE_ENV === "production"
      ? posts.filter((post) => post.frontmatter.status !== "draft")
      : posts;

  // Get featured post and categorize remaining posts
  const featuredPost = publishedPosts[0];
  const regularPosts = publishedPosts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Super Compact Hero Section with modern gradient background */}
      <div className="relative">
        <div className="absolute inset-0 top-[-58px] bg-gradient-to-t from-purple-800 to-blue-900">
          {/* Single subtle animated background element */}
          <div className="absolute top-5 right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto pt-6 pb-4 px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between max-w-7xl mx-auto pb-5">
            <div>
              <div className="inline-flex items-center justify-center mb-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-blue-100 text-xs font-medium">
                  Calqulation Blog
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white sm:text-3xl mb-1 leading-tight">
                <span className="block">Financial Insights</span>
                {/* <span className="hidden md:inline mx-2">—</span> */}
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                  Tips & Guides
                </span>
              </h1>
            </div>
            <div className="hidden md:block">
              <IoNewspaperOutline
                size={110}
                className="text-muted-foreground opacity-45"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-background">
        {/* Compact categories bar */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 overflow-x-auto py-2 scrollbar-hide no-scrollbar">
              <Button
                variant="link"
                className="text-foreground hover:text-primary font-medium py-1 px-1 min-w-0"
              >
                All
              </Button>
              <div className="h-4 border-r border-gray-200 dark:border-gray-700"></div>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary font-medium py-1 px-1 min-w-0"
              >
                Investing
              </Button>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary font-medium py-1 px-1 min-w-0"
              >
                Loans
              </Button>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary font-medium py-1 px-1 min-w-0"
              >
                Retirement
              </Button>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary font-medium py-1 px-1 min-w-0"
              >
                Tax Planning
              </Button>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary font-medium py-1 px-1 min-w-0"
              >
                Financial Planning
              </Button>
            </div>
          </div>
        </div>

        {/* Main content container with reduced padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          {/* Compact Search and Filter Bar */}
          <div className="mb-5 flex flex-col md:flex-row justify-between items-center gap-3">
            <h2 className="text-xl font-bold text-foreground relative">
              Latest Articles
              <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-primary rounded-full"></span>
            </h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-9 pr-3 py-1.5 text-sm bg-card/50 border border-input rounded-full focus:outline-none focus:ring-1 focus:ring-primary/40 w-full md:w-48"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-xs" />
              </div>
            </div>
          </div>

          {/* Two column layout with featured post taking more space - optimized height */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
            {featuredPost && (
              <div className="lg:col-span-8">
                <h3 className="text-xs uppercase tracking-wider text-primary font-semibold mb-3 flex items-center">
                  <span className="mr-2">✦</span>
                  <span>Editor&apos;s Pick</span>
                  <span className="flex-grow border-b border-gray-200 dark:border-gray-800 ml-4"></span>
                </h3>
                <div className="bg-card dark:bg-gray-800/40 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-64">
                    <Image
                      src={
                        featuredPost.frontmatter.thumbnailUrl ||
                        "/Calqulation.png"
                      }
                      alt={featuredPost.frontmatter.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                      <div className="absolute bottom-0 left-0 p-6">
                        {featuredPost.frontmatter.category && (
                          <Link
                            href={`/blog/category/${featuredPost.frontmatter.category.toLowerCase()}`}
                            className="inline-block text-xs font-bold bg-primary/90 text-white uppercase tracking-wider px-2 py-0.5 rounded-full mb-3"
                          >
                            {featuredPost.frontmatter.category}
                          </Link>
                        )}
                        <Link href={`/blog/${featuredPost.slug}`}>
                          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 hover:text-blue-200 transition-colors duration-200">
                            {featuredPost.frontmatter.title}
                          </h2>
                        </Link>
                        <div className="flex items-center text-xs text-gray-200">
                          <HiOutlineClock className="mr-1" />
                          {featuredPost.frontmatter.date &&
                            moment(
                              new Date(featuredPost.frontmatter.date)
                            ).format("MMM d, yyyy")}
                          <span className="mx-2">•</span>
                          <span>5 min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {featuredPost.frontmatter.description}
                    </p>
                    <div className="mt-3 flex justify-end">
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="text-xs font-semibold text-primary hover:underline flex items-center"
                      >
                        Continue reading →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Trending sidebar or Newsletter signup - optimized height */}
            <div className="lg:col-span-4">
              <h3 className="text-xs uppercase tracking-wider text-primary font-semibold mb-3 flex items-center">
                <span className="mr-2">✦</span>
                <span>Weekly Newsletter</span>
                <span className="flex-grow border-b border-gray-200 dark:border-gray-800 ml-4"></span>
              </h3>
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl overflow-hidden shadow-md p-4 mb-4">
                <h4 className="text-white text-base font-bold mb-1">
                  Get Financial Updates
                </h4>
                <p className="text-blue-100 mb-3 text-xs">
                  Sign up for our newsletter to receive the latest financial
                  tips.
                </p>
                <form className="flex flex-col">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-3 py-1.5 text-sm rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 mb-2 focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                  <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 h-8 text-xs">
                    Subscribe
                  </Button>
                </form>
              </div>

              {/* Popular tags - more compact */}
              <div className="bg-card dark:bg-gray-800/40 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                <h4 className="font-semibold text-sm text-foreground mb-2">
                  Popular Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs h-6 py-0 px-2.5"
                  >
                    Investments
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs h-6 py-0 px-2.5"
                  >
                    Planning
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs h-6 py-0 px-2.5"
                  >
                    Loans
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs h-6 py-0 px-2.5"
                  >
                    EMI
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs h-6 py-0 px-2.5"
                  >
                    SIP
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs h-6 py-0 px-2.5"
                  >
                    Retirement
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Recent articles headline */}
          <div className="flex items-center mb-5">
            <h3 className="text-base font-bold text-foreground">
              Recent Articles
            </h3>
            <div className="ml-3 flex-grow h-px bg-gray-200 dark:bg-gray-800"></div>
          </div>

          {/* Regular Blog Posts in Grid - with smaller gap */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}

            {publishedPosts.length === 0 && (
              <div className="col-span-3 bg-card dark:bg-gray-800/60 rounded-xl p-8 text-center border border-gray-100 dark:border-gray-700">
                <div className="inline-flex items-center justify-center p-2.5 bg-primary/10 rounded-full mb-3">
                  <FaSearch className="text-primary text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1.5">
                  No blog posts found
                </h3>
                <p className="text-muted-foreground text-sm">
                  Check back soon for new content or subscribe to our
                  newsletter!
                </p>
              </div>
            )}
          </div>

          {/* Load More Button - more compact */}
          {publishedPosts.length > 0 && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="rounded-full px-6 py-1 h-9 text-sm"
              >
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BlogPostCard({ post }: { post: Post }) {
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
            {frontmatter.date &&
              moment(new Date(frontmatter.date)).format("MMM d, yyyy")}
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
