import Link from "next/link";
import Image from "next/image";

export default function ProductLink({ sku, productUrl }) {
  const productLinks = [
    {
      name: "Nike",
      image: "/Nike.jpg",
      url: productUrl,
    },
    {
      name: "Goat",
      image: "/Goat.jpg",
      url: `https://goat.com/search?query=${sku}`,
    },
    {
      name: "SNKRDUNK",
      image: "/SNKRDUNK.jpg",
      url: `https://snkrdunk.com/products/${sku}`,
    },
    {
      name: "Kream",
      image: "/Kream.png",
      url: `https://kream.co.kr/search?keyword=${sku}`,
    },
  ];

  return (
    <div className="mb-4 flex items-center gap-2">
      {productLinks.map(({ name, image, url }) => (
        <Link key={name} href={url} target="_blank">
          <Image
            src={image}
            alt={`${name} Logo`}
            width={32}
            height={32}
            className="rounded-full border border-border transition-all hover:border-0 hover:ring-2 hover:ring-ring"
          />
        </Link>
      ))}
    </div>
  );
}
