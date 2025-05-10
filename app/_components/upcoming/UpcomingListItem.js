import Link from "next/link";
import { getStatusColour } from "@/app/_lib/utils";
import { motion } from "motion/react";

function UpcomingListItemMobile({ product }) {
  const { status, name, sku, price, releaseTime, imageUrl } = product;

  return (
    <Link
      href={`/${sku}`}
      className="group flex cursor-pointer items-center justify-start gap-3 px-4 py-3 hover:bg-secondary"
    >
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <motion.img
          src={imageUrl}
          alt={name}
          className="h-20 w-20 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:ease-out"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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

function UpcomingCardItem({ product }) {
  const { status, name, sku, price, releaseTime, imageUrl } = product;

  return (
    <Link href={`/${sku}`} className="group flex flex-col rounded-md px-4">
      <div className="relative mb-4 overflow-hidden rounded-md">
        <motion.img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:ease-out"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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

export default function UpcomingListItem({ product, isMobile }) {
  if (isMobile) return <UpcomingListItemMobile product={product} />;
  return <UpcomingCardItem product={product} />;
}
