"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import BackButton from "./BackButton";
import SearchResult from "./SearchResult";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (pathname !== "/" && !isSearchBarExpanded)
    return (
      <nav className="flex items-center justify-between gap-1 p-4">
        <BackButton onClick={() => router.push("/")} />
        <div className="flex gap-1">
          <SearchBar
            isSearchBarExpanded={isSearchBarExpanded}
            setIsSearchBarExpanded={setIsSearchBarExpanded}
          />
          <ThemeToggle />
        </div>
      </nav>
    );

  return (
    <nav className="relative">
      <div className="flex items-center justify-end gap-1 p-4">
        {!isSearchBarExpanded ? (
          <SearchBar setIsSearchBarExpanded={setIsSearchBarExpanded} />
        ) : (
          <div className="flex flex-grow gap-1">
            <BackButton
              onClick={() => {
                setSearchQuery("");
                setIsSearchBarExpanded(false);
              }}
            />
            <SearchBar
              isSearchBarExpanded={isSearchBarExpanded}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        )}
        <ThemeToggle />
      </div>
      {isSearchBarExpanded && (
        <SearchResult
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsSearchBarExpanded={setIsSearchBarExpanded}
        />
      )}
    </nav>
  );
}
