"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import CloseSearchBarButton from "./CloseSearchBarButton";
import SearchResult from "./SearchResult";

export default function Navigation() {
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="px-4 py-2">
      {!isSearchBarExpanded ? (
        <div className="flex items-center justify-between">
          <Link href="/" className="bg-muted text-xl font-bold">
            NIKE DROPS
          </Link>
          <div className="flex gap-1">
            <SearchBar
              isSearchBarExpanded={isSearchBarExpanded}
              setIsSearchBarExpanded={setIsSearchBarExpanded}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <ThemeToggle />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <CloseSearchBarButton
            onClick={() => {
              setSearchQuery("");
              setIsSearchBarExpanded(false);
            }}
          />
          <div className="relative flex-grow">
            <SearchBar
              isSearchBarExpanded={isSearchBarExpanded}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <SearchResult
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setIsSearchBarExpanded={setIsSearchBarExpanded}
            />
          </div>
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
}
