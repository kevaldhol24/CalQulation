import { Button } from "@/components/ui/button";
import { generateSlug, getAllTags } from "@/lib/mdx";
import Link from "next/link";

export default function TagsCard() {
  const tags = getAllTags();
  return (
    <div className="bg-card dark:bg-gray-800/40 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-4">
      <div className="flex flex-wrap gap-1.5">
        {Object.keys(tags)
          .slice(0, 5)
          .map((tag) => (
            <Button
              key={tag}
              variant="outline"
              size="sm"
              className="rounded-full text-xs h-6 py-0 px-2.5"
            >
              <Link href={`/blog/tag/${generateSlug(tag)}`}>{tag}</Link>
            </Button>
          ))}
      </div>
    </div>
  );
}
