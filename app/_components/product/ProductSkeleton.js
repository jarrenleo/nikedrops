"use client";

import { useGlobalState } from "@/app/_providers/ContextProvider";
import Skeleton from "../ui/Skeleton";

export default function ProductSkeleton() {
  const { channel } = useGlobalState();
  // Match FadeInImage's channel ratio so the hero doesn't jump on load
  const aspectRatio =
    channel === "SNKRS Web" ? "aspect-[8/9]" : "aspect-square";

  return (
    <div className="w-full px-4 pb-6 sm:mx-auto sm:max-w-xl md:grid md:max-w-4xl md:grid-cols-2 md:items-start md:gap-8">
      <div>
        {/* Carries the shared-element name so the card → hero morph still
            plays if navigation commits before the product page arrives */}
        <div className={`mb-4 ${aspectRatio}`} data-vt-hero="">
          <Skeleton className="h-full w-full" />
        </div>
        <Skeleton className="mb-2 h-6 w-3/4" />
        <div className="mb-4 flex items-center gap-2">
          {[0, 1, 2, 3].map((link) => (
            <Skeleton key={link} className="h-8 w-8" />
          ))}
        </div>
      </div>
      <div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          {[0, 1, 2, 3, 4, 5].map((detail) => (
            <div key={detail} className="flex flex-col gap-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </div>
        <div>
          <Skeleton className="mb-1 h-5 w-36" />
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {[0, 1, 2, 3, 4, 5].map((size) => (
              <div key={size} className="flex flex-col gap-1">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
