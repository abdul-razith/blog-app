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

const getBlogs = async () => {
  const res = await fetch("http://localhost:3000/api/blog", { cache: "no-store" }); // Avoid caching for fresh data
  const data = await res.json();
  return data.success ? data.blogs : [];
};



export default async function Home() {
  const blogs = await getBlogs(); // Fetch data once on the server

  return (
    <div>
        <Categories blogs={blogs} />
    </div>
  );
}
