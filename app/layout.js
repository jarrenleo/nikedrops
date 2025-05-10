import { GeistSans } from "geist/font/sans";
import QueryProvider from "./_providers/QueryProvider";
import ThemeProvider from "./_providers/ThemeProvider";
import ContextProvider from "./_providers/ContextProvider";
import Navigation from "./_components/navigation/Navigation";
import Footer from "./_components/footer/Footer";
import "./globals.css";

export const metadata = {
  title: "Nike Drops",
  description:
    "Nike Drops is a sneaker release app that allows users to view upcoming and prior sneaker releases with additional product information that are usually obscured by Nike on their official webstore.",
  openGraph: {
    images: ["./icon.png"],
  },
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
              <div className="mx-auto flex min-h-screen max-w-7xl flex-1 flex-col">
                <Navigation />
                <main className="flex flex-1 flex-col">{children}</main>
                <Footer />
              </div>
            </ContextProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
