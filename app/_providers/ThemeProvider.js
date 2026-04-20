"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({ children, ...props }) {
  // React 19 warns when next-themes renders an executable script on the client.
  const scriptProps =
    typeof window === "undefined" ? undefined : { type: "application/json" };

  return (
    <NextThemesProvider {...props} scriptProps={scriptProps}>
      {children}
    </NextThemesProvider>
  );
}
