"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStatusColour } from "@/app/_lib/utils";
import {
  navigateWithViewTransition,
  getTransitionSku,
} from "@/app/_lib/view_transition";
import FadeInImage from "../ui/FadeInImage";

function useProductNavigation(country, sku) {
  const router = useRouter();

  return function handleClick(e) {
    e.preventDefault();

    // Only one element may carry the shared-element name at a time
    document
      .querySelectorAll("[data-vt-hero]")
      .forEach((el) => el.removeAttribute("data-vt-hero"));
    e.currentTarget
      .querySelector("[data-hero-target]")
      ?.setAttribute("data-vt-hero", "");

    navigateWithViewTransition(() => router.push(`/${country}/${sku}`), sku);
  };
}

function UpcomingListItemMobile({ product, country }) {
  const { status, name, sku, price, releaseTime, imageUrl } = product;
  const handleClick = useProductNavigation(country, sku);

  return (
    <Link
      href={`/${country}/${sku}`}
      // Full prefetch so navigation commits the real product page (with its
      // data-vt-hero element) instead of the loading skeleton — otherwise the
      // card → hero morph is lost on deployed (dynamic) routes
      prefetch={true}
      onClick={handleClick}
      className="group flex cursor-pointer items-center justify-start gap-3 px-4 py-3 hover:bg-secondary"
    >
      <div
        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md"
        data-hero-target=""
        data-vt-hero={getTransitionSku() === sku ? "" : undefined}
      >
        <FadeInImage
          src={imageUrl}
          alt={name}
          height={80}
          width={80}
          className="object-cover group-hover:scale-[1.025]"
        />
      </div>
      <div className="flex flex-col gap-1.5 text-sm">
        <h3 className="line-clamp-1 font-semibold">{name}</h3>
        <div className="flex items-center gap-1.5">
          <span>{price}</span>
          <span className="text-muted-foreground">{releaseTime}</span>
        </div>
        <span
          className={`inline-block w-fit rounded-md px-1.5 py-0.5 text-xs font-semibold text-white ${getStatusColour(status)}`}
        >
          {status}
        </span>
      </div>
    </Link>
  );
}

function UpcomingCardItem({ product, country }) {
  const { status, name, sku, price, releaseTime, imageUrl } = product;
  const handleClick = useProductNavigation(country, sku);

  return (
    <Link
      href={`/${country}/${sku}`}
      prefetch={true}
      onClick={handleClick}
      className="group flex flex-col rounded-md"
    >
      <div
        className="relative mb-4 overflow-hidden rounded-md"
        data-hero-target=""
        data-vt-hero={getTransitionSku() === sku ? "" : undefined}
      >
        <FadeInImage
          src={imageUrl}
          alt={name}
          height={720}
          width={720}
          className="object-cover group-hover:scale-[1.025]"
        />
        <span
          className={`absolute bottom-2 right-2 rounded-md px-2 py-1 text-xs font-semibold text-white ${getStatusColour(status)}`}
        >
          {status}
        </span>
      </div>
      <div className="text-sm">
        <h3 className="mb-2 line-clamp-1 font-semibold">{name}</h3>
        <div className="flex items-center gap-2">
          <span>{price}</span>
          <span className="text-muted-foreground">{releaseTime}</span>
        </div>
      </div>
    </Link>
  );
}

export default function UpcomingListItem({ product, country, isMobile }) {
  if (isMobile)
    return <UpcomingListItemMobile product={product} country={country} />;
  return <UpcomingCardItem product={product} country={country} />;
}
