"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({
  isSearchBarExpanded,
  setIsSearchBarExpanded,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {!isSearchBarExpanded ? (
        <button
          className="rounded-md p-2 transition-colors hover:bg-secondary"
          onClick={() => setIsSearchBarExpanded(true)}
        >
          <Search size="20" />
        </button>
      ) : (
        <input
          type="text"
          placeholder="Search SKU"
          className="h-full w-full rounded-md bg-secondary px-4 py-2 outline-none transition-colors placeholder:text-sm placeholder:text-muted-foreground"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      )}
    </>
  );
}
