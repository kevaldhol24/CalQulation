import { Button } from "@/components/ui/button";
import { generateSlug, getAllCategories } from "@/lib/mdx";
import Link from "next/link";

export default function CategoryNav() {
  const categories = getAllCategories();
  const activeCategory = null; // Replace with actual active category logic

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 overflow-x-auto py-2 scrollbar-hide no-scrollbar">
          <Button
            variant="link"
            className={`font-medium py-1 px-1 min-w-0 ${
              activeCategory === null
                ? "text-foreground"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Link href="/blog">All</Link>
          </Button>
          <div className="h-4 border-r border-gray-200 dark:border-gray-700"></div>

          {Object.keys(categories)
            .slice(0, 5)
            .map((category) => (
              <Button
                key={category}
                variant="link"
                className={`font-medium py-1 px-1 min-w-0 ${
                  activeCategory === generateSlug(category)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Link href={`/blog/category/${generateSlug(category)}`}>
                  {category}
                </Link>
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}
