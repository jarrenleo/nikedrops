import { GeistMono } from "geist/font/mono";
import QueryProvider from "./_providers/QueryProvider";
import ThemeProvider from "./_providers/ThemeProvider";
import "./globals.css";

export const metadata = {
  title: "Sneakify",
  description: "A user-friendly tool to view Nike products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistMono.className}`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
