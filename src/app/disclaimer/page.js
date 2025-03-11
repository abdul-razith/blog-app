import Disclaimer from "@/components/MoreInfo/Disclaimer";

export const metadata = {
  title: "Disclaimer",
  description:
    "Read the FitLife360 disclaimer to understand the limitations of information provided on our website. Stay informed about our policies.",

  keywords: [
    "FitLife disclaimer",
    "health information disclaimer",
    "website legal notice",
    "fitness advice policy",
    "content liability",
  ],

  robots: "noindex, follow", // Avoid indexing in search results, but allow link crawling
  alternates: {
    canonical: "https://www.fitlife360.life/disclaimer",
  },
};


export default function Home() {
  return (
    <div>
      <Disclaimer />
    </div>
  );
}
