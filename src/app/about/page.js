import About from "@/components/MoreInfo/About";

export const metadata = {
  title: "About Us",
  description:
    "Learn more about FitLife360, our mission, and how we help people achieve their health and fitness goals.",

  keywords: [
    "about FitLife",
    "health and fitness",
    "fitness community",
    "healthy lifestyle",
    "workout motivation",
  ],
}

export default function Home() {
  return (
    <div>
      <About />
    </div>
  );
}
