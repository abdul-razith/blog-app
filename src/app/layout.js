"use client"; // Marking it as a client component

import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import Script from "next/script";

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

        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENCE_CLIENT_ID}`}
          crossOrigin="anonymous"
        ></Script>

        {!isAdmin && <Header />} {/* Hide Header on Admin Pages */}
        <main>{children}</main>
        {!isAdmin && <Footer />} {/* Hide Footer on Admin Pages */}
      </body>
    </html>
  );
}
