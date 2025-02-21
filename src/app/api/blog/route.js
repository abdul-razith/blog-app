import { NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/config/db";
import BlogModel from "../../../../lib/models/blogModel";
import cloudinary from "@/utils/cloudinary";

const LoadDB = async () => {
  await ConnectDB();
};

export async function GET(request) {
  try {
      await LoadDB(); // Ensure DB connection
      console.log("GET Blog API Called");

      //const blogId = "67b70f2270459353be153f44";
      const { searchParams} = new URL(request.url);
      const blogId = searchParams.get("id");
      console.log("ROUTE BLOG ID" , blogId);


      if (blogId) { //put this symbol and remove the symbol to fix the errors "! not symbol"
          const blog = await BlogModel.findById(blogId);
          if (!blog) {
              return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
          }
          return NextResponse.json({ success: true, blogs: blog }, { status: 200 });
      } else {
          const blogs = await BlogModel.find({}).sort({ createdAt: -1 });
          return NextResponse.json({ success: true, blogs }, { status: 200 });
      }
  } catch (error) {
      console.error("Error fetching blogs:", error);
      return NextResponse.json(
          { success: false, message: "Failed to fetch blogs" },
          { status: 500 }
      );
  }
}




// ✅ Get Next Blog ID for Folder Naming (Blog_1, Blog_2, ...)
async function getNextBlogId() {
  const blogCount = await BlogModel.countDocuments();
  return blogCount + 1; // If 5 blogs exist, next will be Blog_6
}

// ✅ Upload Image to Cloudinary
async function uploadImageToCloudinary(image, folder, imageName) {
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder, public_id: imageName, resource_type: "image" },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary Upload Error:", error);
            return reject(error);
          }
          resolve(result.secure_url); // Cloudinary URL
        }
      )
      .end(buffer);
  });
}



// ✅ POST API: Upload Blog
export async function POST(request) {
  await LoadDB();

  const formData = await request.formData();

  // ✅ Get Next Blog ID
  const blogId = await getNextBlogId();
  const folderName = `blogs/Blog_${blogId}`;

  // ✅ Upload Thumbnail
  const thumbnailImage = formData.get("image");
  console.log("📌 Thumbnail Image Received:", thumbnailImage);

  const thumbnailUrl = await uploadImageToCloudinary(
    thumbnailImage,
    folderName,
    "thumbnail_image"
  );
  console.log("✅ Uploaded Thumbnail URL:", thumbnailUrl);

  // ✅ Upload Related Images
  const relatedImages = formData.getAll("relatedImages");
  console.log("📌 Related Images Received:", relatedImages);

  let relatedImageUrls = [];
  if (relatedImages.length > 0) {
    relatedImageUrls = await Promise.all(
      relatedImages.map((img, index) =>
        uploadImageToCloudinary(img, folderName, `related_image_${index + 1}`)
      )
    );
  }

  console.log("✅ Uploaded Related Images URLs:", relatedImageUrls);

  // ✅ Ensure `relatedImageUrls` is stored
  const blogData = {
    thumbnail: thumbnailUrl,
    relatedImages: relatedImageUrls, // 🔥 Make sure this exists
    tags: formData.get("tags").split(","),
    title: formData.get("title"),
    description: formData.get("description"),
    author: formData.get("author"),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }), // IST
    blogContent: formData.get("blogcontent"),
  };

  console.log("📌 Final Blog Data Before Saving:", blogData);

  // ✅ Save Blog to MongoDB
  const savedBlog = await BlogModel.create(blogData);
  console.log("✅ BLOG SAVED TO DATABASE:", savedBlog);

  return NextResponse.json({
    success: true,
    msg: "Blog added",
    blog: savedBlog,
  });
}
