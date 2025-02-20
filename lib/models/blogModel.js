import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  thumbnail: { type: String, required: true }, // Cloudinary URL
  relatedImages: { type: [String], required: true }, // Array of Cloudinary URLs
  tags: { type: [String], required: true }, // e.g., ["web3", "freelance"]
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  blogContent: { type: String, required: true },
});

// Prevent OverwriteModelError
const BlogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default BlogModel;
