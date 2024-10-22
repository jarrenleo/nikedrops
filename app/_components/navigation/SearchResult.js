"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useGlobalState } from "@/app/_providers/ContextProvider";

const Spinner = dynamic(() => import("@/app/_components/others/Spinner"), {
  ssr: false,
});

async function searchProduct(searchQuery, country) {
  try {
    const response = await fetch(
      `/api/search?q=${searchQuery}&country=${country}`,
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    return data;
  } catch (error) {
    throw Error(error.message);
  }
}

export default function SearchResult({
  searchQuery,
  setSearchQuery,
  setIsSearchBarExpanded,
}) {
  const { country, setChannel } = useGlobalState();
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const { isPending, error, data } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchProduct(debouncedQuery, country),
    enabled: debouncedQuery.length > 9,
    retry: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  function handleClick(channel) {
    setSearchQuery("");
    setIsSearchBarExpanded(false);
    setChannel(channel);
  }

  if (isPending && searchQuery.length > 9)
    return (
      <div className="absolute left-[60px] top-16 z-10 flex w-[calc(100%-120px)] justify-center rounded-md bg-muted p-4">
        <Spinner size={30} stroke={3} />
      </div>
    );

  if (error)
    return (
      <div className="absolute left-[60px] top-16 z-10 w-[calc(100%-120px)] rounded-md bg-muted py-8 text-center text-sm text-muted-foreground">
        {error.message}
      </div>
    );

  if (debouncedQuery && data)
    return (
      <Link
        href={`/${data.sku}`}
        onClick={() => handleClick(data.channel)}
        className="absolute left-[60px] top-16 z-10 flex w-[calc(100%-120px)] cursor-pointer items-center gap-2 rounded-md bg-muted p-4 transition-colors hover:bg-neutral-700"
      >
        <div className="h-10 w-10 flex-shrink-0">
          <img
            src={data.imageUrl}
            alt={data.name}
            className="h-full w-full rounded-full border border-border object-cover"
          />
        </div>
        <div>
          <span className="line-clamp-1 text-sm font-semibold">
            {data.name}
          </span>
          <span className="text-xs text-muted-foreground">{data.sku}</span>
        </div>
      </Link>
    );
}
