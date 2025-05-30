import { BlogHero } from "@/components/feature/Blog/BlogLayoutWrapper";
import CategoryNav from "@/components/feature/Blog/CategoryNav";

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
          {children}
        </div>
      </div>
    </div>
  );
}
