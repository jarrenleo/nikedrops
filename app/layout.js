import { GeistSans } from "geist/font/sans";
import QueryProvider from "./_providers/QueryProvider";
import ThemeProvider from "./_providers/ThemeProvider";
import ContextProvider from "./_providers/ContextProvider";
import Navigation from "./_components/navigation/Navigation";
import "./globals.css";

export const metadata = {
  title: "Nike Drops",
  description: "Nike Drops is a sneaker release app that allows users to view upcoming and prior sneaker releases with additional product information that are usually obscured by Nike on their official webstore.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className}`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ContextProvider>
              <main className="mx-auto max-w-7xl">
                <Navigation />
                {children}
              </main>
            </ContextProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
