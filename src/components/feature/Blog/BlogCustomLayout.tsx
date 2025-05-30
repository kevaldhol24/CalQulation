import { FC } from "react";
import { Comments } from "../Comments";
import { Sidebar } from "./Sidebar";
import { BlogSearch } from "./BlogSearch";

interface BlogCustomLayoutProps {
  children?: React.ReactNode;
  slug?: string;
}

export const BlogCustomLayout: FC<BlogCustomLayoutProps> = ({
  children,
  slug,
}) => {
  return (
    <>
      <div className="lg:hidden mb-6">
        <BlogSearch />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        <div className="lg:col-span-8">{children}</div>

        {/* Trending sidebar or Newsletter signup - optimized height */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
      {!!slug && <Comments postId={slug} />}
    </>
  );
};
