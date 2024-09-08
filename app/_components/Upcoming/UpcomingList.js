"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import UpcomingListItem from "./UpcomingListItem";
import Spinner from "../others/Spinner";

export default function UpcomingList() {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);

  const channel = searchParams.get("channel");
  const country = searchParams.get("country");
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `/api/upcoming?channel=${channel}&country=${country}&timeZone=${timeZone}`,
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        setData(data);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [channel, country, timeZone]);

  return (
    <Suspense fallback={<Spinner />}>
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
    </Suspense>
  );
}
