import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4">
      <div className="truncate text-end text-sm text-muted-foreground">
        Built by{" "}
        <Link
          href="https://github.com/jarrenleo"
          target="_blank"
          className="font-semibold text-foreground underline transition-colors hover:text-foreground/90"
        >
          Jarren Leo
        </Link>
        . The source code is available on{" "}
        <Link
          href="https://github.com/jarrenleo/nikedrops"
          target="_blank"
          className="font-semibold text-foreground underline transition-colors hover:text-foreground/90"
        >
          GitHub
        </Link>
        .
      </div>
    </footer>
  );
}
