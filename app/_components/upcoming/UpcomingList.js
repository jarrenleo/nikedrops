"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import UpcomingListItem from "./UpcomingListItem";
import Spinner from "../others/Spinner";

async function fetchUpcomingList(channel, country, timeZone) {
  try {
    // throw new Error("Something went wrong. Please try again later.");
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    const response = await fetch(
      `/api/upcoming?channel=${channel}&country=${country}&timeZone=${timeZone}`,
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    return data;
  } catch (error) {
    throw Error(error.message);
  }
}

export default function UpcomingList() {
  const router = useRouter();
  const params = useParams();
  const [channel, country] = params.slug.split("_");
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["upcomingList", channel, country, timeZone],
    queryFn: () => fetchUpcomingList(channel, country, timeZone),
  });

  useEffect(() => {
    if (data) {
      const firstDate = Object.keys(data)[0];
      const firstProduct = data[firstDate][0];

      if (firstProduct && firstProduct.sku)
        router.push(`/${channel}_${country}_${firstProduct.sku}`);
    }
  }, [data, channel, country, router]);

  if (isPending) return <Spinner />;

  if (isError)
    return (
      <div className="mt-4 text-balance text-center font-semibold">
        {error.message}
      </div>
    );

  return (
    <div className="h-[calc(100vh-10.2rem)] overflow-y-scroll pt-2">
      {Object.entries(data).map(([date, products]) => {
        return (
          <ul key={date} className="mb-2">
            <li className="px-2 py-1 text-sm">{date}</li>
            {products.map((product) => (
              <UpcomingListItem key={product.id} product={product} />
            ))}
          </ul>
        );
      })}
    </div>
  );
}
