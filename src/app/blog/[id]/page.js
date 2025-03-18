import Blogcontent from "@/components/Blogcontent";
import Suggested from "@/components/Suggested";
import BlogModel from "../../../../lib/models/blogModel";
import { ConnectDB } from "../../../../lib/config/db";

// Ensure database connection is established before proceeding
let dbConnected = false;

async function connectToDB() {
  if (!dbConnected) {
    await ConnectDB();
    dbConnected = true; // Set this only after successful connection
  }
}

// ✅ Preload `params.id` before using in `generateMetadata`
export async function generateStaticParams() {
  try {
    await connectToDB();
    const blogs = await BlogModel.find({}, "_id").lean();
    return blogs.map(({ _id }) => ({ id: _id.toString() }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// ✅ Optimized `generateMetadata`
export async function generateMetadata({ params }) {
  try {
    const {id} = await params;

    if (!id) {
      return {
        title: "Blog Not Found",
        description: "This blog post does not exist.",
      };
    }

    await connectToDB();
    const blogPost = await BlogModel.findById(id).lean();

    if (!blogPost) {
      return {
        title: "Blog Not Found",
        description: "This blog post does not exist.",
      };
    }

    const { title, description, tags, thumbnail } = blogPost;

    return {
      title,
      description,
      keywords: tags || ["fitness", "health", "nutrition", "workout"],
      openGraph: {
        title,
        description,
        url: `https://www.fitlife360.life/blog/${id}`,
        siteName: "FitLife",
        images: [
          {
            url: thumbnail || "https://www.fitlife360.life/default-blog-image.jpg",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | FitLife360 Blog`,
        description,
        images: [thumbnail || "https://www.fitlife360.life/default-blog-image.jpg"],
      },
      robots: "index, follow",
      alternates: {
        canonical: `https://www.fitlife360.life/blog/${id}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error Loading Blog Post",
      description: "An error occurred while loading this blog post.",
    };
  }
}

const getBlogs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`);
  const data = await res.json();
  return data.success ? data.blogs : [];
};

export default async function BlogPage() {
  const blogs = await getBlogs(); // Fetch data once on the server
  return (
    <div>
      <Blogcontent />
      <Suggested blogs={blogs} />
    </div>
  );
}
