"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackToUpcomingDropsButton() {
  const router = useRouter();
  const params = useParams();

  function handleClick() {
    router.push(`/${params.country}`);
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
