"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGlobalState } from "@/app/_providers/ContextProvider";
import TabSelect from "./TabSelect";
import UpcomingList from "./UpcomingList";
import CountrySelect from "./CountrySelect";

export default function Upcoming() {
  const router = useRouter();
  const { country } = useParams();
  const { setCountry } = useGlobalState();

  useEffect(() => {
    setCountry(country.toUpperCase());
    router.push(`/${country.toUpperCase()}`);
  }, []);

  return (
    <>
      <div className="mx-4 flex items-center justify-between border-b border-secondary">
        <TabSelect />
        <CountrySelect />
      </div>
      <UpcomingList />
    </>
  );
}
