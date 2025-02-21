import { NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/config/db";
import BlogModel from "../../../../lib/models/blogModel";
import cloudinary from "@/utils/cloudinary";

const LoadDB = async () => {
  await ConnectDB();
};

// ✅ GET API: Fetch All Blogs or a Single Blog
export async function GET(request) {
  try {
    await LoadDB();
    console.log("GET Blog API Called");

    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("id");
    console.log("ROUTE BLOG ID:", blogId);

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json(
          { success: false, message: "Blog not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, blog }, { status: 200 });
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

// ✅ Get Next Blog ID for Folder Naming
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
          resolve(result.secure_url);
        }
      )
      .end(buffer);
  });
}

// ✅ Get IST Date-Time & Blog Folder Name
function getISTDateTime(blogTitle) {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST = UTC +5:30
  const istDate = new Date(now.getTime() + istOffset);

  // Format date-time as YYYY-MM-DDTHH:mm:ss.sss+05:30 (MongoDB format)
  const mongoDBDate = istDate.toISOString();

  // ✅ Folder Naming: "Blog_blog_post_title"
  const sanitizedTitle = blogTitle.replace(/\s+/g, '_'); // Replace spaces with underscores
  const specificFolderName = `Blog_${sanitizedTitle}`;

  return { specificFolderName, mongoDBDate };
}

// ✅ POST API: Upload Blog
export async function POST(request) {
  await LoadDB();

  const formData = await request.formData();
  const blogTitle = formData.get("title");

  // ✅ Get IST Date-Time & Folder Name
  const { specificFolderName, mongoDBDate } = getISTDateTime(blogTitle);

  // ✅ Upload Thumbnail
  const thumbnailImage = formData.get("image");
  console.log("📌 Thumbnail Image Received:", thumbnailImage);

  const thumbnailUrl = await uploadImageToCloudinary(
    thumbnailImage,
    specificFolderName,
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
        uploadImageToCloudinary(img, specificFolderName, `related_image_${index + 1}`)
      )
    );
  }

  console.log("✅ Uploaded Related Images URLs:", relatedImageUrls);

  // ✅ Save Blog Data to MongoDB
  const blogData = {
    thumbnail: thumbnailUrl,
    relatedImages: relatedImageUrls,
    tags: formData.get("tags").split(","),
    title: blogTitle,
    description: formData.get("description"),
    author: formData.get("author"),
    createdAt: mongoDBDate, // Store IST time in MongoDB
    blogContent: formData.get("blogcontent"),
  };

  console.log("📌 Final Blog Data Before Saving:", blogData);

  // ✅ Save Blog to Database
  const savedBlog = await BlogModel.create(blogData);
  console.log("✅ BLOG SAVED TO DATABASE:", savedBlog);

  return NextResponse.json({
    success: true,
    msg: "Blog added",
    blog: savedBlog,
  });
}
