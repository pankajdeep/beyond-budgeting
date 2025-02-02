import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#ffcb05' }} />
      <Input
        placeholder="Search financial topics..."
        className="pl-10"
      />
    </div>
  );
};