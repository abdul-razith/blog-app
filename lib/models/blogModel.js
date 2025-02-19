import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  thumbnail: { type: String, required: true }, // Image URL
  tags: { type: [String], required: true }, // e.g., ["web3", "freelance"]
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // ✅ Fix: Remove ()
  blogContent: { type: String, required: true }, // HTML content
});

// ✅ Prevent OverwriteModelError
const BlogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default BlogModel;
