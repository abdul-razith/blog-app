import Blogcontent from "@/components/Blogcontent";
import Suggested from "@/components/Suggested";

import BlogModel from "../../../../lib/models/blogModel";

// Fetch dynamic metadata for each blog post
export async function generateMetadata({ params }) {

  const blogPost = await BlogModel.findById(params.id);

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
      url: `https://www.fitlife360.life/blog/${params.id}`,
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
      canonical: `https://www.fitlife360.life/blog/${params.id}`,
    },
  };
}



export default function BlogPage() {
  return (
    <div>
      <Blogcontent/>
      <Suggested />
    </div>
  );
}
