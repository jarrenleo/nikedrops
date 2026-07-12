"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import CloseSearchBarButton from "./CloseSearchBarButton";
import SearchResult from "./SearchResult";

export default function Navigation() {
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);
  const [isSearchBarClosing, setIsSearchBarClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function closeSearchBar() {
    setSearchQuery("");
    setIsSearchBarExpanded(false);
    // Keep the input mounted so the bar can slide back; skipped under
    // reduced motion where the transition (and transitionend) never runs
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      setIsSearchBarClosing(true);
  }

  return (
    <nav
      className={`sticky top-0 z-50 px-4 py-2 transition-[background-color,backdrop-filter] duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-sm"
          : "bg-transparent backdrop-blur-0"
      }`}
    >
      <div className="flex items-center gap-0.5">
        {!isSearchBarExpanded && !isSearchBarClosing ? (
          <Link href="/" className="bg-muted text-xl font-bold">
            NIKE DROPS
          </Link>
        ) : (
          <CloseSearchBarButton onClick={closeSearchBar} />
        )}
        <div
          className={`relative mr-auto min-w-0 basis-0 transition-[flex-grow] duration-300 ease-out motion-reduce:transition-none ${
            isSearchBarExpanded ? "grow" : "grow-0"
          }`}
          onTransitionEnd={(e) => {
            if (e.propertyName === "flex-grow") setIsSearchBarClosing(false);
          }}
        >
          {(isSearchBarExpanded || isSearchBarClosing) && (
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onClose={closeSearchBar}
            />
          )}
          {isSearchBarExpanded && (
            <SearchResult
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setIsSearchBarExpanded={setIsSearchBarExpanded}
            />
          )}
        </div>
        {!isSearchBarExpanded && !isSearchBarClosing && (
          <button
            className="rounded-md p-2 transition hover:bg-secondary active:scale-95"
            onClick={() => setIsSearchBarExpanded(true)}
            aria-label="Search button"
          >
            <Search width={20} height={20} />
          </button>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
