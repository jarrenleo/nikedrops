"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGlobalState } from "@/app/_providers/ContextProvider";
import UpcomingListItem from "./UpcomingListItem";
import Loader from "../ui/Loader";

async function fetchUpcomingData(channel, country, timeZone) {
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
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const { channel, country, timeZone } = useGlobalState();
  const { isPending, error, data } = useQuery({
    queryKey: ["upcomingCards", channel, country],
    queryFn: () => fetchUpcomingData(channel, country, timeZone),
    staleTime: Infinity,
  });

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isPending)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="mt-8 text-balance text-center font-semibold">
        {error.message}
      </div>
    );

  const isMobile = viewportWidth < 768;

  return (
    <div className="space-y-3 py-6 md:space-y-6">
      {Object.entries(data).map(([date, products]) => (
        <ul key={date}>
          <li className="px-4 pb-3 font-semibold md:pb-6">{date}</li>
          <li
            className={`${!isMobile && "grid grid-cols-3 gap-4 px-4 lg:grid-cols-4"}`}
          >
            {products.map((product) => (
              <UpcomingListItem
                key={product.id}
                product={product}
                isMobile={isMobile}
              />
            ))}
          </li>
        </ul>
      ))}
    </div>
  );
}
