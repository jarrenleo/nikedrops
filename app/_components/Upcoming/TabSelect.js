"use client";

import { useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function TabSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  function handleTabClick(tab) {
    router.push(`?${createQueryString("channel", tab)}`);
  }

  return (
    <div className="flex border-b border-secondary font-semibold">
      <button
        className={`border-b-2 px-4 py-2 ${
          searchParams.get("channel") === "SNKRS Web"
            ? "border-primary"
            : "border-transparent text-muted-foreground"
        }`}
        onClick={() => handleTabClick("SNKRS Web")}
      >
        SNKRS
      </button>
      <button
        className={`border-b-2 px-4 py-2 ${
          searchParams.get("channel") === "Nike.com"
            ? "border-primary"
            : "border-transparent text-muted-foreground"
        }`}
        onClick={() => handleTabClick("Nike.com")}
      >
        Nike
      </button>
    </div>
  );
}
