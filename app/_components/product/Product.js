"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useGlobalState } from "@/app/_providers/ContextProvider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/others/Carousel";
import { getStatusColour } from "@/app/_lib/utils";
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
    releaseDate,
    releaseTime,
    sku,
    price,
    releaseMethod,
    quantityLimit,
    sizesAndStockLevels,
    productUrl,
    imageUrl,
  } = data;

  return (
    <div className="p-4">
      <Carousel className="relative mb-4 overflow-x-hidden">
        <CarouselContent className="aspect-square">
          <CarouselItem>
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full rounded-md border border-border object-cover"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full rounded-md border border-border object-cover"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <div
          className={`absolute left-2 top-2 z-10 rounded-md px-2 py-1 text-xs ${getStatusColour(status)}`}
        >
          {status}
        </div>
      </Carousel>
      <h2 className="mb-4 text-balance font-semibold">{name}</h2>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <ProductDetail label="Price" value={price} />
        <ProductDetail label="SKU" value={sku} />
        <ProductDetail label="Method" value={releaseMethod} />
        <ProductDetail label="Cart Limit" value={quantityLimit} />
        <ProductDetail label="Date" value={releaseDate} />
        <ProductDetail label="Time" value={releaseTime} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground">
          Sizes and Stock Levels
        </span>
        <div className="grid grid-cols-3 gap-2">
          {sizesAndStockLevels.map(({ size, stockLevel }) => (
            <ProductDetail key={size} label={size} value={stockLevel} />
          ))}
        </div>
      </div>
    </div>
  );
}
