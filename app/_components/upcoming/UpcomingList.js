"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import UpcomingListItem from "./UpcomingListItem";
import Spinner from "../others/Spinner";

async function fetchUpcomingList(channel, country, timeZone) {
  const response = await fetch(
    `/api/upcoming?channel=${channel}&country=${country}&timeZone=${timeZone}`,
  );
  if (!response.ok) throw new Error("Failed to fetch data");

  const data = await response.json();
  return data;
}

export default function UpcomingList() {
  const searchParams = useSearchParams();
  const channel = searchParams.get("channel");
  const country = searchParams.get("country");
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["UpcomingList", channel, country, timeZone],
    queryFn: () => fetchUpcomingList(channel, country, timeZone),
  });

  if (isPending) return <Spinner />;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="h-[calc(100dvh-11rem)] overflow-y-scroll pt-2">
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
