import Link from "next/link";
import { getStatusColour } from "@/app/_lib/utils";

function UpcomingListItemMobile({ product }) {
  const { status, name, sku, price, releaseTime, imageUrl } = product;

  return (
    <Link
      href={`/${sku}`}
      className="flex cursor-pointer items-center justify-start gap-3 px-4 py-3 transition-all duration-300 animate-in fade-in hover:bg-secondary"
    >
      <div className="relative">
        <div className="h-16 w-16">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full rounded-full border-2 border-border object-cover"
          />
        </div>
        <div
          className={`absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full border-2 border-border ${getStatusColour(status)}`}
        ></div>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <h3 className="line-clamp-1 font-semibold">{name}</h3>
        <span>{price}</span>
        <span className="text-xs text-muted-foreground">{releaseTime}</span>
      </div>
    </Link>
  );
}

function UpcomingCardItem({ product }) {
  const { status, name, sku, price, releaseTime, imageUrl } = product;

  return (
    <Link
      href={`/${sku}`}
      className="flex h-[26rem] flex-col rounded-md border border-border transition-all duration-300 animate-in fade-in hover:-translate-y-1"
    >
      <div className="relative h-3/4">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full rounded-t-md object-cover"
        />

        <span
          className={`absolute bottom-2 right-2 rounded-md px-2 py-1 text-xs font-semibold ${getStatusColour(status)}`}
        >
          {status}
        </span>
      </div>
      <div className="flex h-1/4 flex-col justify-between rounded-b-md bg-secondary p-4">
        <h3 className="mb-1 line-clamp-1 text-sm font-semibold">{name}</h3>
        <table>
          <thead>
            <tr className="text-xs text-muted-foreground">
              <th>Price</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm">
              <td>{price}</td>
              <td>{releaseTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Link>
  );
}

export default function UpcomingListItem({ product, isMobile }) {
  if (isMobile) return <UpcomingListItemMobile product={product} />;
  return <UpcomingCardItem product={product} />;
}
