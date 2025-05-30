import CategoryNav from "@/components/feature/Blog/CategoryNav";
import { Sidebar } from "@/components/feature/Blog/Sidebar";
import { BlogHero } from "@/components/feature/Blog/BlogLayoutWrapper";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Hero section - conditionally rendered based on route */}
      <BlogHero />

      {/* Main Content Area */}
      <div className="bg-gray-50 dark:bg-background">
        {/* Compact categories bar */}
        <CategoryNav />

        {/* Main content container with reduced padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          {/* Compact Search and Filter Bar */}

          {/* Two column layout with featured post taking more space - optimized height */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
            <div className="lg:col-span-8">{children}</div>

            {/* Trending sidebar or Newsletter signup - optimized height */}
            <div className="lg:col-span-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
