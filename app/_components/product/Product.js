"use client";

import { useQuery } from "@tanstack/react-query";
import { useGlobalState } from "@/app/_providers/ContextProvider";
import Spinner from "../others/Spinner";

async function fetchProduct(channel, sku, country, timeZone) {
  const response = await fetch(
    `/api/product?channel=${channel}&sku=${sku}&country=${country}&timeZone=${timeZone}`,
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);

  return data;
}

export default function Product() {
  const { channel, sku, country, timeZone } = useGlobalState();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["product", channel, sku, country, timeZone],
    queryFn: () => fetchProduct(channel, sku, country, timeZone),
    enabled: !!channel && !!sku && !!country && !!timeZone,
    staleTime: Infinity,
  });

  if (isPending) return <Spinner />;

  if (isError)
    return (
      <div className="mt-4 text-balance text-center font-semibold">
        {error.message}
      </div>
    );

  return <div>{data}</div>;
}
