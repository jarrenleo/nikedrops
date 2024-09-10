"use client";

import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 transition-colors hover:bg-secondary"
    >
      {resolvedTheme === "dark" ? <MoonStar /> : <Sun />}
    </button>
  );
}
