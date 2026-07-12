"use client";

export default function SearchBar({ searchQuery, setSearchQuery, onClose }) {
  return (
    <input
      type="text"
      placeholder="Search SKU"
      className="h-[36px] w-full min-w-0 rounded-md bg-secondary px-4 py-3 outline-none placeholder:text-sm placeholder:text-muted-foreground"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      autoFocus
    />
  );
}
