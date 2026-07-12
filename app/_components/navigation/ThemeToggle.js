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
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(newTheme);
      return;
    }

    // Keyboard activation reports (0,0), fall back to the button's center
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    const r = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    document.documentElement.style.setProperty("--ripple-x", `${x}px`);
    document.documentElement.style.setProperty("--ripple-y", `${y}px`);
    document.documentElement.style.setProperty("--ripple-r", `${r}px`);

    document.documentElement.classList.add("theme-transition");
    const transition = document.startViewTransition(() => setTheme(newTheme));
    transition.finished.finally(() =>
      document.documentElement.classList.remove("theme-transition"),
    );
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-md p-2 transition hover:bg-secondary active:scale-95"
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
