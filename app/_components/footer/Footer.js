import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-4">
      <div className="truncate text-end text-sm text-muted-foreground">
        Built by{" "}
        <Link
          href="https://github.com/jarrenleo"
          target="_blank"
          className="font-semibold text-foreground underline hover:text-foreground/90 hover:transition-colors"
        >
          Jarren Leo
        </Link>
        . The source code is available on{" "}
        <Link
          href="https://github.com/jarrenleo/nikedrops"
          target="_blank"
          className="font-semibold text-foreground underline hover:text-foreground/90 hover:transition-colors"
        >
          GitHub
        </Link>
        .
      </div>
    </footer>
  );
}
