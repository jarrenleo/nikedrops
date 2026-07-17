"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGlobalState } from "@/app/_providers/ContextProvider";
import ProductLinks from "@/app/_components/product/ProductLinks";
import ProductDetail from "@/app/_components/product/ProductDetail";
import BackToUpcomingDropsButton from "@/app/_components/product/BackToUpcomingDropsButton";
import CountdownTimer from "@/app/_components/product/CountdownTimer";
import CopySkuButton from "@/app/_components/product/CopySkuButton";
import ProductSkeleton from "@/app/_components/product/ProductSkeleton";
import { getStatusColour, getStockLevelColour } from "@/app/_lib/utils";
import Skeleton from "../ui/Skeleton";
import FadeInImage from "../ui/FadeInImage";

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

function findProductInUpcomingCache(queryClient, channel, country, sku) {
  const upcomingData = queryClient.getQueryData([
    "upcomingCards",
    channel,
    country,
  ]);
  if (!upcomingData) return undefined;

  for (const products of Object.values(upcomingData)) {
    const match = products.find((product) => product.sku === sku);
    if (match) {
      const { status, name, price, imageUrl } = match;
      return { status, name, sku, price, imageUrl };
    }
  }
}

export default function Product() {
  const params = useParams();
  const queryClient = useQueryClient();
  const { channel, timeZone, setCountry } = useGlobalState();
  const country = params.country.toUpperCase();
  const sku = params.sku.toUpperCase();

  const { isPending, isPlaceholderData, error, data } = useQuery({
    queryKey: ["product", channel, country, sku, timeZone],
    queryFn: () => fetchProduct(channel, country, sku, timeZone),
    // Seed from the upcoming list cache so the page (and the
    // card → hero view transition) renders instantly
    placeholderData: () =>
      findProductInUpcomingCache(queryClient, channel, country, sku),
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    setCountry(country);
  }, []);

  // Fade in the sections that swap from Skeletons to real values when the
  // live fetch resolves; cached visits render full data on the first frame
  // and skip the animation entirely
  const wasPlaceholderRef = useRef(false);
  const justResolved = wasPlaceholderRef.current && !isPlaceholderData;
  useEffect(() => {
    wasPlaceholderRef.current = isPlaceholderData;
  });
  const resolvedAnimation = justResolved
    ? "duration-200 animate-in fade-in motion-reduce:animate-none"
    : "";

  if (isPending)
    return (
      <>
        <BackToUpcomingDropsButton />
        <ProductSkeleton />
      </>
    );
  if (error)
    return (
      <>
        <BackToUpcomingDropsButton />
        <div className="my-8 text-balance text-center font-semibold">
          {error.message}
        </div>
      </>
    );

  const {
    status,
    name,
    date,
    time,
    releaseTimestamp,
    price,
    method,
    cartLimit,
    sizesAndStockLevels,
    productUrl,
    imageUrl,
  } = data;

  let sizesAndStockLevelsContent = "-";
  if (isPlaceholderData) {
    sizesAndStockLevelsContent = [0, 1, 2, 3, 4, 5].map((size) => (
      <div key={size} className="flex flex-col gap-1">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-5 w-16" />
      </div>
    ));
  } else if (sizesAndStockLevels.length) {
    sizesAndStockLevelsContent = sizesAndStockLevels.map(
      ({ size, stockLevel }) => (
        <ProductDetail key={size} label={size} value={stockLevel}>
          <div
            className={`${getStockLevelColour(stockLevel)} h-4 w-4 rounded-md`}
          ></div>
        </ProductDetail>
      ),
    );
  }

  const productDetails = [
    { label: "Price", value: price },
    { label: "SKU", value: data.sku },
    { label: "Method", value: method },
    { label: "Cart Limit", value: cartLimit },
    { label: "Date", value: date },
    { label: "Time", value: time },
  ];

  return (
    <>
      <BackToUpcomingDropsButton />
      <div className="w-full px-4 pb-6 sm:mx-auto sm:max-w-xl md:grid md:max-w-4xl md:grid-cols-2 md:items-start md:gap-8">
        <div>
          <div className="relative mb-4 aspect-square">
            <div
              className="group relative overflow-hidden rounded-md"
              data-vt-hero=""
            >
              <FadeInImage
                src={imageUrl}
                alt={name}
                height={960}
                width={960}
                className="object-cover group-hover:scale-[1.025]"
              />
              <div
                className={`absolute bottom-2 right-2 cursor-default rounded-md bg-background px-2 py-1 text-xs font-semibold text-white ${getStatusColour(
                  status,
                )}`}
              >
                {status}
              </div>
            </div>
          </div>
          <h2 className="mb-2 cursor-default text-lg font-semibold">{name}</h2>
          {isPlaceholderData ? (
            <div className="mb-4 flex items-center gap-2">
              {[0, 1, 2, 3].map((link) => (
                <Skeleton key={link} className="h-8 w-8" />
              ))}
            </div>
          ) : (
            <ProductLinks
              sku={data.sku}
              productUrl={productUrl}
              className={resolvedAnimation}
            />
          )}
        </div>
        <div className="text-sm">
          {releaseTimestamp && (
            <CountdownTimer releaseTimestamp={releaseTimestamp} />
          )}
          <div className={`mb-4 grid grid-cols-2 gap-4 ${resolvedAnimation}`}>
            {productDetails.map(({ label, value }) => (
              <ProductDetail
                key={label}
                label={label}
                value={value ?? <Skeleton className="h-5 w-24" />}
              >
                {label === "SKU" && <CopySkuButton sku={data.sku} />}
              </ProductDetail>
            ))}
          </div>
          <div>
            <span className="text-muted-foreground">Sizes & Stock Levels</span>
            <div
              className={`grid grid-cols-3 gap-2 sm:grid-cols-4 ${resolvedAnimation}`}
            >
              {sizesAndStockLevelsContent}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
