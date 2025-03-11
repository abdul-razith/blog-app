import Contact from "@/components/MoreInfo/Contact";


export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with FitLife360. Contact us for fitness advice, partnership opportunities, or any inquiries. We’re here to help you achieve your health goals!",

  keywords: [
    "contact FitLife",
    "fitness support",
    "get in touch",
    "customer service",
    "fitness inquiries",
    "health and wellness contact",
  ],

  robots: "index, follow",
  alternates: {
    canonical: "https://www.fitlife360.life/contact",
  },
};



export default function Home() {
  return (
    <div>
      <Contact />
    </div>
  );
}
