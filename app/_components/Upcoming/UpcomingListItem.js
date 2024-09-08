import Image from "next/image";

export default function UpcomingListItem({ product }) {
  const { id, name, sku, price, releaseTime, imageUrl } = product;

  return (
    <li
      key={id}
      className="flex cursor-pointer items-center justify-start gap-3 rounded-md px-2 py-3 hover:bg-secondary"
    >
      <Image
        src={imageUrl}
        alt={name}
        width={52}
        height={52}
        className="rounded-full"
      />
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
