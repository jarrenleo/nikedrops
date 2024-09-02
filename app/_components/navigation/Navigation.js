"use client";

import { useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CountrySelect from "./CountrySelect";
import BackButton from "./BackButton";

export default function Navigation() {
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);

  return (
    <div className="border-b-[1px] border-muted p-4">
      {!isSearchBarExpanded ? (
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex gap-2">
            <SearchBar setIsSearchBarExpanded={setIsSearchBarExpanded} />
            <CountrySelect />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <BackButton setIsSearchBarExpanded={setIsSearchBarExpanded} />
          <SearchBar isSearchBarExpanded={isSearchBarExpanded} />
          <CountrySelect />
        </div>
      )}
    </div>
  );
}
