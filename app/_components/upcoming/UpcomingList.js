"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { useGlobalState } from "@/app/_providers/ContextProvider";
import UpcomingListItem from "./UpcomingListItem";

const Spinner = dynamic(() => import("@/app/_components/others/Spinner"), {
  ssr: false,
});

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

function setScrollPosition(scrollPosition) {
  const scrollContainer = document.querySelector(".scroll-container");
  if (scrollContainer) scrollContainer.scrollTop = +scrollPosition;
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

  useEffect(() => {
    setScrollPosition(0);
  }, [country]);

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem(`scrollPosition_${channel}`);
    if (scrollPosition) setScrollPosition(scrollPosition);
  }, [channel]);

  function handleScroll(e) {
    sessionStorage.setItem(`scrollPosition_${channel}`, e.target.scrollTop);
  }

  if (isPending)
    return (
      <div className="mt-8 flex items-center justify-center">
        <Spinner size={60} stroke={6} />
      </div>
    );
  if (error)
    return (
      <div className="mt-4 text-balance text-center font-semibold">
        {error.message}
      </div>
    );

  const isMobile = viewportWidth < 768;

  return (
    <div
      className="flex-1 space-y-4 py-2 md:space-y-8 md:py-4"
      onScroll={handleScroll}
    >
      {Object.entries(data).map(([date, products]) => (
        <ul key={date}>
          <li className="px-4 text-sm font-semibold md:mb-2 md:text-base">
            {date}
          </li>
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
