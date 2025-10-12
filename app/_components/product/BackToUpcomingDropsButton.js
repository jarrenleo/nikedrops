"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useGlobalState } from "@/app/_providers/ContextProvider";

export default function BackToUpcomingDropsButton() {
  const router = useRouter();
  const { country } = useGlobalState();

  function handleClick() {
    country ? router.push(`/${country}`) : router.push("/");
  }

  return (
    <button
      onClick={handleClick}
      className="mx-4 mb-4 inline-flex items-center font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="mr-1 h-4 w-4" />
      Back to Upcoming Drops
    </button>
  );
}
