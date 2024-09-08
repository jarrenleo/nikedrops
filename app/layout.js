import { Courier_Prime } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./_providers/ThemeProvider";

const courierPrime = Courier_Prime({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Sneakify",
  description: "A user-friendly tool to view Nike products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${courierPrime.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
