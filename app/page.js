"use client";

import { redirect } from "next/navigation";
import { useGlobalState } from "./_providers/ContextProvider";

export default function Page() {
  const { country } = useGlobalState();

  if (country) return redirect(`/${country}`);
  return redirect(`/SG`);
}
