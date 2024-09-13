"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import BackButton from "./BackButton";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);

  if (pathname !== "/" && !isSearchBarExpanded)
    return (
      <nav className="flex items-center justify-between gap-1 p-4">
        <BackButton onClick={() => router.back()} />
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
    <nav className="flex items-center justify-end gap-1 p-4">
      {!isSearchBarExpanded ? (
        <SearchBar setIsSearchBarExpanded={setIsSearchBarExpanded} />
      ) : (
        <div className="flex flex-grow gap-1">
          <BackButton onClick={() => setIsSearchBarExpanded(false)} />
          <SearchBar isSearchBarExpanded={isSearchBarExpanded} />
        </div>
      )}
      <ThemeToggle />
    </nav>
  );
}
