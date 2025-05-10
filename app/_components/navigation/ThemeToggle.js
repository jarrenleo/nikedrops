"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 transition-colors hover:bg-secondary"
      aria-label="Theme toggle button"
    >
      {resolvedTheme === "dark" ? (
        <Moon width={20} height={20} />
      ) : (
        <Sun width={20} height={20} />
      )}
    </button>
  );
}
