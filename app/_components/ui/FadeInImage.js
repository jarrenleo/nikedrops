"use client";

import { useState } from "react";
import { useGlobalState } from "@/app/_providers/ContextProvider";

export default function FadeInImage({ className = "", src, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { channel } = useGlobalState();
  // Both branches render the channel's ratio (SNKRS images are 960x1080,
  // Nike.com are square) so images and placeholders are always the same size
  const aspectRatio =
    channel === "SNKRS Web" ? "aspect-[8/9]" : "aspect-square";

  if (!src)
    return (
      <div
        className={`${className} ${aspectRatio} flex w-full items-center justify-center bg-white [container-type:inline-size]`}
      >
        <span className="px-1 text-center text-[clamp(9px,4.5cqi,20px)] font-semibold text-neutral-400">
          IMAGE UNAVAILABLE
        </span>
      </div>
    );

  return (
    <img
      src={src}
      {...props}
      ref={(node) => {
        // Cached images are complete before onLoad is attached and must
        // paint instantly (no fade), or view-transition snapshots capture
        // a transparent hero
        if (node?.complete) setIsLoaded(true);
      }}
      onLoad={() => setIsLoaded(true)}
      className={`${className} ${aspectRatio} w-full object-cover transition-[opacity,transform] duration-300 ease-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
