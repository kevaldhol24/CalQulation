import { Suspense } from "react";
import { BlogSearch } from "./BlogSearch";
import CategoriesCard from "./CategoriesCard";
import EmiCalculatorPromo from "./EmiCalculatorPromo";
import SipCalculatorPromo from "./SipCalculatorPromo";
import Subscribe from "./Subscribe";
import TagsCard from "./TagsCard";

export const Sidebar = () => {
  return (
    <>
      <div className="hidden lg:block">
        <Suspense
          fallback={<div className="h-1 bg-gray-200 dark:bg-gray-800"></div>}
        >
          <BlogSearch />
        </Suspense>
      </div>

      <h3 className="text-xs uppercase tracking-wider text-primary font-semibold mb-4 flex items-center">
        <span className="mr-2">✦</span>
        <span>Weekly Newsletter</span>
        <span className="flex-grow border-b border-gray-200 dark:border-gray-800 ml-4"></span>
      </h3>
      <Subscribe />

      <h3 className="text-xs uppercase tracking-wider text-primary font-semibold mb-4 mt-6 flex items-center">
        <span className="mr-2">✦</span>
        <span>Popular Categories</span>
        <span className="flex-grow border-b border-gray-200 dark:border-gray-800 ml-4"></span>
      </h3>
      <CategoriesCard />

      {/* Popular tags */}
      <h3 className="text-xs uppercase tracking-wider text-primary font-semibold mb-4 mt-6 flex items-center">
        <span className="mr-2">✦</span>
        <span>Popular Tags</span>
        <span className="flex-grow border-b border-gray-200 dark:border-gray-800 ml-4"></span>
      </h3>
      <TagsCard />

      <h3 className="text-xs uppercase tracking-wider text-primary font-semibold mb-4 mt-6 flex items-center">
        <span className="mr-2">✦</span>
        <span>Trending Tools</span>
        <span className="flex-grow border-b border-gray-200 dark:border-gray-800 ml-4"></span>
      </h3>
      <EmiCalculatorPromo />
      <SipCalculatorPromo />
    </>
  );
};
