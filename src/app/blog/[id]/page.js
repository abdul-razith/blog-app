import Blogcontent from "@/components/Blogcontent";
import Suggested from "@/components/Suggested";
import BlogModel from "../../../../lib/models/blogModel";
import { ConnectDB } from "../../../../lib/config/db";

// Ensure database connection is established before proceeding
let dbConnected = false;

async function connectToDB() {
  if (!dbConnected) {
    await ConnectDB();
    dbConnected = true;
  }
}

// ✅ Preload `params.id` before using in `generateMetadata`
export async function generateStaticParams() {
  try {
    await connectToDB();
    const blogs = await BlogModel.find({}, "_id").lean();
    return blogs.map((blog) => ({ id: blog._id.toString() }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// ✅ Fix `generateMetadata`
export async function generateMetadata({ params }) {
  try {
    if (!params) { // Check if params exists
      return {
        title: "Blog Not Found",
        description: "This blog post does not exist.",
      };
    }

    const { id } = await params; // Await params here

    if (!id) { // Check if id exists after awaiting params
        return {
          title: "Blog Not Found",
          description: "This blog post does not exist.",
        };
      }

    await connectToDB();
    const blogPost = await BlogModel.findById(id).lean(); // Use awaited id

    if (!blogPost) {
      return {
        title: "Blog Not Found",
        description: "This blog post does not exist.",
      };
    }

    return {
      title: `${blogPost.title}`,
      description: blogPost.description,
      keywords: blogPost.tags || ["fitness", "health", "nutrition", "workout"],
      openGraph: {
        title: `${blogPost.title}`,
        description: blogPost.description,
        url: `https://www.fitlife360.life/blog/${id}`, // Use awaited id
        siteName: "FitLife",
        images: [
          {
            url: blogPost.thumbnail || "https://www.fitlife360.life/default-blog-image.jpg",
            width: 1200,
            height: 630,
            alt: blogPost.title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${blogPost.title} | FitLife360 Blog`,
        description: blogPost.description,
        images: [blogPost.thumbnail || "https://www.fitlife360.life/default-blog-image.jpg"],
      },
      robots: "index, follow",
      alternates: {
        canonical: `https://www.fitlife360.life/blog/${id}`, // Use awaited id
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

export default function BlogPage() {
  return (
    <div>
      <Blogcontent />
      <Suggested />
    </div>
  );
}