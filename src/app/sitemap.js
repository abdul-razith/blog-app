import { ConnectDB } from "../../lib/config/db";
import BlogModel from "../../lib/models/blogModel";

export default async function sitemap() {
  await ConnectDB();

  // Fetch blog posts with `_id` and `createdAt`
  const blogs = await BlogModel.find({}, "_id createdAt").lean();

  // Static pages (No `lastModified`)
  const staticPages = [
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/`, changeFrequency: "yearly", priority: 1.0 },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/category`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/terms-and-conditions`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
];

  // Blog pages (Use `createdAt` for `lastModified`)
  const blogPages = blogs.map((blog) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog._id.toString()}`,
    lastModified: blog.createdAt ? new Date(blog.createdAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Combine static and blog pages
  return [...staticPages, ...blogPages];
}
