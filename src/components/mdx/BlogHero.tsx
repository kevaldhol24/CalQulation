import React from "react";

export interface BlogHeroProps {
  subtitle?: string;
}

export const BlogHero: React.FC<BlogHeroProps> = ({ subtitle }) => {
  return (
    <div className="mb-10 ">
      {subtitle && (
        <h3 className="text-xl font-bold md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl">
          {subtitle}
        </h3>
      )}
    </div>
  );
};

export default BlogHero;
