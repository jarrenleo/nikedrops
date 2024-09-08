"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [channel, setChannel] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setChannel(localStorage.getItem("channel") ?? "SNKRS Web");
    setCountry(localStorage.getItem("country") ?? "SG");

    if (!channel || !country) return;

    (async () => {
      try {
        const response = await fetch(
          `/api/redirect?channel=${channel}&country=${country}`,
        );
        const firstUpcomingSKU = await response.json();

        router.push(
          `/${firstUpcomingSKU}?channel=${channel}&country=${country}`,
        );
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, [router, channel, country]);
}
