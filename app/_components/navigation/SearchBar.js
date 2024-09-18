"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  isSearchBarExpanded,
  setIsSearchBarExpanded,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <>
      {!isSearchBarExpanded ? (
        <button
          className="rounded-md p-2 transition-colors hover:bg-secondary"
          onClick={() => setIsSearchBarExpanded(true)}
          aria-label="Search button"
        >
          <Search />
        </button>
      ) : (
        <input
          type="text"
          placeholder="Search SKU"
          className="h-[40px] w-full rounded-md bg-secondary px-4 py-2 outline-none transition-colors placeholder:text-sm placeholder:text-muted-foreground"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      )}
    </>
  );
}
