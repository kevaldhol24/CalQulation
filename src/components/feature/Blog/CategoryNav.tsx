import { getAllCategories } from "@/lib/mdx";
import { CategoryNavList } from "./CategoryNavList";

export default async function CategoryNav() {
  const categories = getAllCategories();

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryNavList categories={categories} />
      </div>
    </div>
  );
}
