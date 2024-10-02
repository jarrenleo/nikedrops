import Link from "next/link";
import { getStatusColour } from "@/app/_lib/utils";

export default function UpcomingListItem({ product, isMobile }) {
  const { status, name, sku, price, releaseTime, imageUrl } = product;

  if (isMobile)
    return (
      <Link
        href={`/${sku}`}
        className="animate-in fade-in flex cursor-pointer items-center justify-start gap-3 px-4 py-3 transition-all duration-300 hover:bg-secondary"
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
        <div className="flex flex-col gap-1 text-sm">
          <h3 className="line-clamp-1 font-semibold">{name}</h3>
          <span>{price}</span>
          <span className="text-xs text-muted-foreground">{releaseTime}</span>
        </div>
      </Link>
    );

  return (
    <Link
      href={`/${sku}`}
      className="animate-in fade-in flex h-[26rem] flex-col rounded-md border border-border transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-3/4">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full rounded-t-md object-cover"
        />

        <span
          className={`absolute bottom-2 right-2 rounded-md px-2 py-1 text-xs ${getStatusColour(status)}`}
        >
          {status}
        </span>
      </div>
      <div className="flex h-1/4 flex-col justify-between rounded-b-md bg-secondary p-4">
        <h3 className="mb-1 line-clamp-1 text-sm font-semibold">{name}</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-sm text-muted-foreground">
              <th>Price</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{price}</td>
              <td>{releaseTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Link>
  );
}
