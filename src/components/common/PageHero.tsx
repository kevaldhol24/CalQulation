import { FC } from "react";

interface PageHeroProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export const PageHero: FC<PageHeroProps> = ({ title, subtitle, children }) => {
  return (
    <div className="relative">
      {/* Enhanced background with modern gradient */}
      <div className="absolute inset-0 top-[-68px] bg-gradient-to-t via-purple-800 to-blue-900 h-[520px]"></div>

      <div className="relative max-w-7xl mx-auto py-8 px-0 sm:px-6 lg:px-8 z-10 pb-0 mb-8">
        <div className="px-6">
          {children}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
            <span className="inline-block font-bold text-3xl">
              {title}
            </span>
          </h1>
          <p className="text-md text-blue-100 max-w-2xl">
            {subtitle}
          </p>
        </div>
        {/* Calculator section with enhanced styling */}
        
      </div>
    </div>
  );
};
