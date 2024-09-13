"use client";

import { useQuery } from "@tanstack/react-query";
import { useGlobalState } from "@/app/_providers/ContextProvider";
import UpcomingListItem from "./UpcomingListItem";
import Spinner from "../others/Spinner";

async function fetchUpcomingList(channel, country, timeZone) {
  try {
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
  const { channel, country, timeZone } = useGlobalState();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["upcomingList", channel, country],
    queryFn: () => fetchUpcomingList(channel, country, timeZone),
    staleTime: Infinity,
  });

  if (isPending) return <Spinner />;

  if (isError)
    return (
      <div className="mt-4 text-balance text-center font-semibold">
        {error.message}
      </div>
    );

  return (
    <div className="h-[calc(100dvh-10.5rem)] overflow-y-scroll pt-2">
      {Object.entries(data).map(([date, products]) => (
        <ul key={date} className="mb-2">
          <li className="px-4 py-1 text-sm">{date}</li>
          {products.map((product) => (
            <UpcomingListItem key={product.id} product={product} />
          ))}
        </ul>
      ))}
    </div>
  );
}
