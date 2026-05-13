"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  function handleClick(e) {
    const newTheme = isDark ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    document.documentElement.style.setProperty("--ripple-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--ripple-y", `${e.clientY}px`);

    document.startViewTransition(() => setTheme(newTheme));
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-md p-2 transition-colors hover:bg-secondary"
      disabled={!mounted}
      aria-label="Theme toggle button"
    >
      {!mounted ? (
        <span className="block h-5 w-5" aria-hidden="true" />
      ) : isDark ? (
        <Moon width={20} height={20} />
      ) : (
        <Sun width={20} height={20} />
      )}
    </button>
  );
}
