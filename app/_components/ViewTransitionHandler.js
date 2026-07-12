"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  completeViewTransition,
  trackPathname,
} from "@/app/_lib/view_transition";

export default function ViewTransitionHandler() {
  const pathname = usePathname();

  useEffect(() => {
    trackPathname(pathname);
    completeViewTransition();
  }, [pathname]);

  return null;
}
