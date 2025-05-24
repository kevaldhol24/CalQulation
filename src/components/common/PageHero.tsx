import { FC } from "react";
import { IconType } from "react-icons";
import { WaveSeparator } from "../layout/WaveSeparator";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  Icon?: IconType;
}

export const ToolPageHero: FC<PageHeroProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="relative">
      <div
        className={`absolute inset-0 top-[-56px] bg-gradient-to-t via-purple-800 to-blue-900 h-[520px]`}
      ></div>

      <div
        className={`relative max-w-7xl mx-auto py-8 px-0 sm:px-6 lg:px-8 z-10`}
      >
        <div className="px-6 sm:px-0">
          {children}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
            <span className={`inline-block font-bold text-3xl`}>{title}</span>
          </h1>
          <p className={`text-blue-100 max-w-2xl text-md`}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export const PageHero: FC<PageHeroProps> = ({
  title,
  subtitle,
  Icon,
  children,
}) => {
  return (
    <div className="relative">
      {/* Enhanced background with modern gradient */}
      <div className="absolute inset-0 top-[-56px] bg-gradient-to-t from-purple-800 to-blue-900"></div>

      <div className="relative max-w-7xl mx-auto pt-16 pb-8 sm:pb-15 md:pb-20 xl:pb-25 2xl:pb-45 px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-8">
          {Icon && (
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full mb-6 shadow-lg shadow-blue-500/20">
              <Icon className="text-white text-4xl animate-pulse" />
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            <span className="inline-block bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <p className="text-md text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          {children}
        </div>
      </div>

      <WaveSeparator />
    </div>
  );
};
