"use client";

// src/utils/helperFn.js
import { useRouter } from "next/navigation";

export const useRoutingHelpers = () => {
  const router = useRouter();

  const handleTagClick = (tag) => {
    router.push(`/category?tag=${tag}`);
  };

  return { handleTagClick };
};



/* Add the images inside the html */
export const renderBlogContentWithImages = (htmlContent, relatedImages) => {
  let modifiedContent = htmlContent;

  relatedImages.forEach((imageURL, index) => {
    const placeholder = `![RELATED_IMAGE_${index + 1}_PLACEHOLDER]`;
    const imageTag = `<img src="${imageURL}" alt="Related Image ${
      index + 1
    }" class="w-full rounded-lg shadow-md my-4" />`;

    modifiedContent = modifiedContent.replace(placeholder, imageTag);
  });

  return modifiedContent;
};




// ✅ Get IST Date-Time & Blog Folder Name
export function getISTDateTime(blogTitle) {
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