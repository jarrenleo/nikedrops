import Link from "next/link";
import Image from "next/image";

export default function ProductLinks({ sku, productUrl }) {
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
          <div className="overflow-hidden rounded-md">
            <Image
              src={image}
              alt={`${name} Logo`}
              width={32}
              height={32}
              className="transition-transform duration-300 hover:scale-110"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
