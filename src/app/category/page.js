import Categories from "@/components/Category";


export const metadata = {
  title: "Categories",
  description:
    "Explore various health and fitness categories, including workouts, nutrition, weight loss, muscle building, and wellness tips.",

  keywords: [
    "fitness categories",
    "health topics",
    "workout types",
    "nutrition advice",
    "weight loss tips",
    "muscle gain plans",
    "healthy living",
  ],

  robots: "index, follow",
  alternates: {
    canonical: "https://www.fitlife360.life/category",
  },
};



export default function Home() {
  return (
    <div>
        <Categories />
    </div>
  );
}