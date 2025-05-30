import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    onSearch(searchTerm);
  };

  return (
    <div className="mb-5 flex flex-col md:flex-row justify-between items-center gap-3">
      <h2 className="text-xl font-bold text-foreground relative">
        Latest Articles
        <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-primary rounded-full"></span>
      </h2>
      
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative">
          <input
            type="text"
            name="search"
            placeholder="Search articles..."
            className="pl-9 pr-3 py-1.5 text-sm bg-card/50 border border-input rounded-full focus:outline-none focus:ring-1 focus:ring-primary/40 w-full md:w-48"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-xs" />
        </div>
        <Button type="submit" variant="outline" size="sm" className="rounded-full h-8 px-3 text-xs">
          Search
        </Button>
      </form>
    </div>
  );
}
