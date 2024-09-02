"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  isSearchBarExpanded,
  setIsSearchBarExpanded,
}) {
  return (
    <>
      {!isSearchBarExpanded ? (
        <button
          className="rounded-md bg-secondary p-3 transition-colors hover:bg-primary/20"
          onClick={() => setIsSearchBarExpanded(true)}
        >
          <Search size="20" />
        </button>
      ) : (
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search SKU"
            className="h-full w-full rounded-md bg-secondary p-3 outline-none transition-colors placeholder:text-sm hover:bg-primary/20"
          />
        </div>
      )}
    </>
  );
}
