"use client";

import { useRouter } from "next/navigation";
import { getStatusColour } from "@/app/_lib/utils";

export default function UpcomingListItem({ product }) {
  const router = useRouter();
  const { id, status, name, sku, price, releaseTime, imageUrl } = product;

  return (
    <li
      key={id}
      className="flex cursor-pointer items-center justify-start gap-3 rounded-md px-4 py-3 transition-colors hover:bg-secondary"
      onClick={() => router.push(`/${sku}`)}
    >
      <div className="relative">
        <div className="h-14 w-14">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full rounded-full border-2 border-border object-cover"
          />
        </div>
        <div
          className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-border ${getStatusColour(status)}`}
        ></div>
      </div>
      <div className="flex flex-col text-sm">
        <h3 className="line-clamp-1 font-semibold">{name}</h3>
        <span>{price}</span>
        <span className="text-xs text-muted-foreground">
          {releaseTime} &#10072; {sku}
        </span>
      </div>
    </li>
  );
}
