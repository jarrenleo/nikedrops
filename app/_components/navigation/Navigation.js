"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import BackButton from "./BackButton";

export default function Navigation() {
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);

  return (
    <div className="mb-4 flex items-center justify-end gap-1">
      {!isSearchBarExpanded ? (
        <SearchBar setIsSearchBarExpanded={setIsSearchBarExpanded} />
      ) : (
        <div className="flex flex-grow items-center gap-1">
          <BackButton setIsSearchBarExpanded={setIsSearchBarExpanded} />
          <SearchBar isSearchBarExpanded={isSearchBarExpanded} />
        </div>
      )}
      <ThemeToggle />
    </div>
  );
}
