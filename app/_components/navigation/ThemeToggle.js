"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 transition-colors hover:bg-secondary"
    >
      {theme === "dark" ? <MoonStar size={20} /> : <Sun size={20} />}
    </button>
  );
}
