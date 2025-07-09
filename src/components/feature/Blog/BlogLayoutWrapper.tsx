"use client";

import { usePathname } from "next/navigation";
import { IoNewspaperOutline } from "react-icons/io5";

interface BlogHeroProps {
  isMobileApp?: boolean;
}

export const BlogHero: React.FC<BlogHeroProps> = ({ isMobileApp }) => {
  const pathname = usePathname();
  const isIndividualBlogPost = pathname && /^\/blog\/[^\/]+$/.test(pathname);

  if (isIndividualBlogPost || isMobileApp) {
    return (
      <div className="relative">
        <div className="absolute inset-0 top-[-58px] bg-blue-900" />
      </div>
    );
  }

  return (
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
  );
};
