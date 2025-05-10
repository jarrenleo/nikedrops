"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackToUpcomingDropsButton() {
  const router = useRouter();

  function handleClick() {
    window.history.length > 2 ? router.back() : router.push("/");
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
