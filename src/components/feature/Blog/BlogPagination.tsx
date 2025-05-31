"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_BLOG_PAGINATION_SIZE } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface BlogPaginationProps {
  hasMore: boolean;
}

export default function BlogPagination({ hasMore }: BlogPaginationProps) {
  const [currentSize, setCurrentSize] = useState(DEFAULT_BLOG_PAGINATION_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialSearch = searchParams.get("size") || "";
    const size = parseInt(initialSearch, 10);
    const currentPage = isNaN(size) ? DEFAULT_BLOG_PAGINATION_SIZE : size;
    setCurrentSize(currentPage);
    setIsLoading(false); // Reset loading state when navigation completes
  }, [searchParams]);

  const loadMoreArticles = useCallback(() => {
    setIsLoading(true);
    router.push(`/blog?size=${currentSize + 2}`, { scroll: false });
  }, [currentSize, router]);

  if (!hasMore) return null;

  return (
    <div className="mt-8 text-center">
      <Button
        variant="outline"
        className="rounded-full px-6 py-1 h-9 text-sm"
        onClick={loadMoreArticles}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Load More Articles"}
      </Button>
    </div>
  );
}
