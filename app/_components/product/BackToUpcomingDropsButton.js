"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  navigateWithViewTransition,
  getPreviousPathname,
} from "@/app/_lib/view_transition";

export default function BackToUpcomingDropsButton() {
  const router = useRouter();
  const params = useParams();

  function handleClick() {
    const listPath = `/${params.country}`;
    // Going back through history restores the scroll position;
    // pushing always lands at the top
    const cameFromList =
      getPreviousPathname()?.toLowerCase() === listPath.toLowerCase();

    navigateWithViewTransition(
      () => (cameFromList ? router.back() : router.push(listPath)),
      params.sku?.toUpperCase(),
      !cameFromList,
    );
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
