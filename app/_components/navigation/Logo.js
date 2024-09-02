import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/icon.png" width={44} height={44} alt="Sneakify Logo"></Image>
    </Link>
  );
}
