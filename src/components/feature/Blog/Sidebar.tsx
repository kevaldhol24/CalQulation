import { BlogSearch } from "./BlogSearch";
import Subscribe from "./Subscribe";
import TagsCard from "./TagsCard";

export const Sidebar = () => {
  return (
    <>
      <BlogSearch />
      <h3 className="text-xs uppercase tracking-wider text-primary font-semibold mb-4 flex items-center">
        <span className="mr-2">✦</span>
        <span>Weekly Newsletter</span>
        <span className="flex-grow border-b border-gray-200 dark:border-gray-800 ml-4"></span>
      </h3>
      <Subscribe />

      {/* Popular tags - more compact */}
      <TagsCard />
    </>
  );
};
