"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useGlobalState } from "@/app/_providers/ContextProvider";
import { getStatusColour } from "@/app/_lib/utils";
import ProductLink from "@/app/_components/product/ProductLink";
import Spinner from "@/app/_components/others/Spinner";

async function fetchProduct(channel, country, sku, timeZone) {
  try {
    const response = await fetch(
      `/api/product?channel=${channel}&country=${country}&sku=${sku}&timeZone=${timeZone}`,
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    return data;
  } catch (error) {
    throw Error(error.message);
  }
}

function ProductDetail({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}

export default function Product() {
  const params = useParams();
  const { channel, country, timeZone } = useGlobalState();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["product", channel, country, params.sku, timeZone],
    queryFn: () => fetchProduct(channel, country, params.sku, timeZone),
    staleTime: Infinity,
  });

  if (isPending) return <Spinner />;
  if (isError)
    return (
      <div className="mt-4 text-balance text-center font-semibold">
        {error.message}
      </div>
    );

  const {
    status,
    name,
    date,
    time,
    sku,
    price,
    method,
    cartLimit,
    sizesAndStockLevels,
    productUrl,
    imageUrl,
  } = data;

  const productDetails = [
    { label: "Price", value: price },
    { label: "SKU", value: sku },
    { label: "Method", value: method },
    { label: "Cart Limit", value: cartLimit },
    { label: "Date", value: date },
    { label: "Time", value: time },
  ];

  return (
    <div className="mb-8 mt-4 px-4 sm:mx-auto sm:max-w-xl">
      <div className="relative mb-4 aspect-square">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full rounded-md border border-border object-cover"
        />
        <div
          className={`absolute left-2 top-2 rounded-md bg-background px-2 py-1 text-xs font-semibold ${getStatusColour(
            status,
          )}`}
        >
          {status}
        </div>
      </div>
      <div>
        <h2 className="mb-2 text-balance font-semibold">{name}</h2>
        <ProductLink sku={sku} productUrl={productUrl} />
        <div className="mb-4 grid grid-cols-2 gap-4">
          {productDetails.map(({ label, value }) => (
            <ProductDetail key={label} label={label} value={value} />
          ))}
        </div>
        <div>
          <span className="text-xs text-muted-foreground">
            Sizes & Stock Levels
          </span>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {sizesAndStockLevels.length
              ? sizesAndStockLevels.map(({ size, stockLevel }) => (
                  <ProductDetail key={size} label={size} value={stockLevel} />
                ))
              : "-"}
          </div>
        </div>
      </div>
    </div>
  );
}
