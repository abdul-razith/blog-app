import { NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/config/db";
import BlogModel from "../../../../lib/models/blogModel";
import cloudinary from "@/utils/cloudinary";

/* Helper Fn. */
// ✅ Get IST Date-Time & Blog Folder Name
export function getISTDateTime(blogTitle) {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST = UTC +5:30
  const istDate = new Date(now.getTime() + istOffset);

  // Format date-time as YYYY-MM-DDTHH:mm:ss.sss+05:30 (MongoDB format)
  const mongoDBDate = istDate.toISOString();

  // ✅ Folder Naming: "Blog_blog_post_title"
  const sanitizedTitle = blogTitle.replace(/\s+/g, "_"); // Replace spaces with underscores
  const specificFolderName = `Blog_${sanitizedTitle}`;

  return { specificFolderName, mongoDBDate };
}

// ✅ Initialize DB Connection
export const LoadDB = async () => await ConnectDB();

// ✅ Upload Image to Cloudinary
const uploadImageToCloudinary = async (image, folder, imageName) => {
  try {
    const buffer = Buffer.from(await image.arrayBuffer());

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder, public_id: imageName, resource_type: "image" },
          (error, result) =>
            error ? reject(error) : resolve(result.secure_url)
        )
        .end(buffer);
    });
  } catch (err) {
    console.error("❌ Cloudinary Upload Error:", err);
    throw err;
  }
};

// ✅ GET API: Fetch Blogs (By ID, Tag, or All)
export async function GET(request) {
  try {
    await LoadDB();
    console.log("GET Blog API Called");

    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("id");
    const tag = searchParams.get("tag");

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return blog
        ? NextResponse.json({ success: true, blog }, { status: 200 })
        : NextResponse.json(
            { success: false, message: "Blog not found" },
            { status: 404 }
          );
    }

    const query = tag ? { tags: tag } : {};
    const blogs = await BlogModel.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// ✅ POST API: Upload Blog
export async function POST(request) {
  try {
    await LoadDB();
    const formData = await request.formData();

    const blogTitle = formData.get("title");
    const { specificFolderName, mongoDBDate } = getISTDateTime(blogTitle);

    // ✅ Upload Thumbnail Image
    const thumbnailUrl = await uploadImageToCloudinary(
      formData.get("image"),
      specificFolderName,
      "thumbnail_image"
    );

    // ✅ Upload Related Images (If Any)
    const relatedImages = formData.getAll("relatedImages");
    const relatedImageUrls = relatedImages.length
      ? await Promise.all(
          relatedImages.map((img, index) =>
            uploadImageToCloudinary(
              img,
              specificFolderName,
              `related_image_${index + 1}`
            )
          )
        )
      : [];

    // ✅ Save Blog Data
    const blogData = {
      thumbnail: thumbnailUrl,
      relatedImages: relatedImageUrls,
      tags: formData.get("tags").split(","),
      title: blogTitle,
      description: formData.get("description"),
      author: formData.get("author"),
      createdAt: mongoDBDate,
      blogContent: formData.get("blogcontent"),
    };

    const savedBlog = await BlogModel.create(blogData);
    console.log("✅ BLOG SAVED:", savedBlog);

    return NextResponse.json({
      success: true,
      msg: "Blog added",
      blog: savedBlog,
    });
  } catch (error) {
    console.error("Error in Blog Upload:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload blog" },
      { status: 500 }
    );
  }
}
