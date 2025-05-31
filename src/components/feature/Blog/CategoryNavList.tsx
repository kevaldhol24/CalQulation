"use client";

import { Button } from "@/components/ui/button";
import { generateSlug } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

interface CategoryNavListProps {
  categories: Record<string, number>;
}

export const CategoryNavList: FC<CategoryNavListProps> = ({ categories }) => {
  const searchParams = useSearchParams().get("category");
  const activeCategory = searchParams ? searchParams : null;

  return (
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
            <Link href={`/blog?category=${generateSlug(category)}`}>
              {category}
            </Link>
          </Button>
        ))}
    </div>
  );
};
