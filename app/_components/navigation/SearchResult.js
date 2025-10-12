"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useGlobalState } from "@/app/_providers/ContextProvider";
import Loader from "../ui/Loader";

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
      <div className="absolute top-10 z-10 flex w-full justify-center rounded-md bg-muted p-4">
        <Loader height={30} width={30} />
      </div>
    );

  if (error)
    return (
      <div className="absolute top-10 z-10 w-full rounded-md bg-muted p-4 text-center text-sm text-muted-foreground">
        {error.message}
      </div>
    );

  if (debouncedQuery && data)
    return (
      <Link
        href={`/${country}/${data.sku}`}
        onClick={() => handleClick(data.channel)}
        className="absolute top-10 z-10 flex w-full cursor-pointer items-center gap-2 rounded-md bg-muted px-4 py-3"
      >
        <img
          src={data.imageUrl}
          alt={data.name}
          height={40}
          width={40}
          className="rounded-md border border-border object-cover"
        />
        <div>
          <span className="line-clamp-1 text-sm font-semibold">
            {data.name}
          </span>
          <span className="text-xs text-muted-foreground">{data.sku}</span>
        </div>
      </Link>
    );
}
