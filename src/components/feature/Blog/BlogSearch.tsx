"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export const BlogSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialSearch = searchParams.get("search") || "";
    setSearchTerm(initialSearch);
  }, [searchParams]);

  const handleSearch = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleClear = () => {
    if (!searchTerm.trim()) return; // Do nothing if search term is already empty
    setSearchTerm("");
    router.push("/blog");
  };

  return (
    <form className="flex justify-end gap-2 mb-3" onSubmit={handleSearch}>
      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search articles..."
          className="pl-9 pr-3 py-1.5 text-sm bg-card/50 border border-input rounded-full focus:outline-none focus:ring-1 focus:ring-primary/40 w-full"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-xs" />
      </div>
      <Button
        variant="default"
        onClick={handleSearch}
        className="px-3 py-1.5 text-sm rounded-full bg-primary text-white hover:bg-primary/90"
      >
        Search
      </Button>
      <Button
        variant="outline"
        className="rounded-full"
        onClick={handleClear}
        disabled={!searchTerm.trim()}
      >
        Clear
      </Button>
    </form>
  );
};
