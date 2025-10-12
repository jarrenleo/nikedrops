"use client";

import { useEffect } from "react";
import { useRouter, useParams, redirect } from "next/navigation";
import { useGlobalState } from "@/app/_providers/ContextProvider";
import TabSelect from "./TabSelect";
import UpcomingList from "./UpcomingList";
import CountrySelect from "./CountrySelect";

const countries = ["AU", "JP", "KR", "SG", "MY", "FR", "GB", "CA", "US", "MX"];

export default function Upcoming() {
  const router = useRouter();
  const { country } = useParams();
  const { setCountry } = useGlobalState();

  if (!countries.includes(country.toUpperCase())) return redirect("/SG");

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
