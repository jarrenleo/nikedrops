"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./_components/others/Spinner";

// async function fetchFirstUpcomingSKU(channel, country) {
//   const response = await fetch(
//     `/api/redirect?channel=${channel}&country=${country}`,
//   );
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.error);

//   return data;
// }

export default function Page() {
  const router = useRouter();
  const [channel, setChannel] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setChannel(localStorage.getItem("channel") ?? "SNKRS");
    setCountry(localStorage.getItem("country") ?? "SG");
  }, []);

  // const {
  //   data: firstUpcomingSKU,
  //   isPending,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["redirect", channel, country],
  //   queryFn: () => fetchFirstUpcomingSKU(channel, country),
  //   enabled: !!channel && !!country,
  // });

  // if (isPending)
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <Spinner />
  //     </div>
  //   );

  // if (isError)
  //   return (
  //     <div className="flex h-screen items-center justify-center text-balance p-4 text-center font-semibold">
  //       {error.message}
  //     </div>
  //   );

  router.push(`/${channel}_${country}`);
}
