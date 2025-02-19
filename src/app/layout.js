"use client"; // Marking it as a client component

import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin"); // Detect admin route

  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {!isAdmin && <Header />} {/* Hide Header on Admin Pages */}
        <main>{children}</main>
        {!isAdmin && <Footer />} {/* Hide Footer on Admin Pages */}
      </body>
    </html>
  );
}
