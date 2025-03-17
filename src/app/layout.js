import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/* FOR SEO */

export const metadata = {
  title: {
    default: "FitLife360 - Your Guide to a Healthy Lifestyle",
    template: "%s | FitLife360",
  },
  description:
    "Discover expert tips, workouts, and nutrition advice on FitLife360. Your journey to a healthier and happier life starts here.",

  keywords: [
    "fitness",
    "health",
    "workout tips",
    "nutrition",
    "weight loss",
    "muscle gain",
    "healthy living",
  ],

  openGraph: {
    title: "FitLife360 - Your Guide to a Healthy Lifestyle",
    description:
      "Stay fit and healthy with our expert fitness tips, diet plans, and workout guides. Join FitLife today!",
    url: "https://www.fitlife360.life",
    siteName: "FitLife360",
    /* images: [
      {
        url: "https://www.fitlife.com/og-image.jpg", // Replace with your real Open Graph image URL
        width: 1200,
        height: 630,
        alt: "FitLife - Stay Fit, Stay Healthy",
      },
    ], */
    locale: "en_US",
    type: "website",
  },

  /* twitter: {
    card: "summary_large_image",
    title: "FitLife - Your Guide to a Healthy Lifestyle",
    description:
      "Stay fit and healthy with our expert fitness tips, diet plans, and workout guides. Join FitLife today!",
    //images: ["https://www.fitlife.com/og-image.jpg"], // Same as Open Graph image
  }, */

  robots: "index, follow",
  alternates: {
    canonical: "https://www.fitlife360.life",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Header />
        <Suspense>
        <main>{children}</main>
        </Suspense>
        <Footer />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
