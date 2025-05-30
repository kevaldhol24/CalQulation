import { Button } from "@/components/ui/button";

interface BlogPaginationProps {
  hasMore: boolean;
  onLoadMore: () => void;
  loading?: boolean;
}

export default function BlogPagination({ hasMore, onLoadMore, loading = false }: BlogPaginationProps) {
  if (!hasMore) return null;

  return (
    <div className="mt-8 text-center">
      <Button 
        variant="outline" 
        className="rounded-full px-6 py-1 h-9 text-sm"
        onClick={onLoadMore}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load More Articles'}
      </Button>
    </div>
  );
}
