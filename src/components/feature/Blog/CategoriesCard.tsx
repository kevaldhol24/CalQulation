import { Button } from "@/components/ui/button";
import { generateSlug, getAllCategories } from "@/lib/mdx";
import Link from "next/link";

export default function CategoriesCard() {
  const categories = getAllCategories();

  return (
    <div className="bg-card dark:bg-gray-800/40 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-4">
      <div className="flex flex-wrap gap-1.5">
        {Object.keys(categories)
          .slice(0, 5)
          .map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className="rounded-full text-xs h-6 py-0 px-2.5"
            >
              <Link href={`/blog?category=${generateSlug(category)}`}>
                {category}
              </Link>
            </Button>
          ))}
      </div>
    </div>
  );
}
