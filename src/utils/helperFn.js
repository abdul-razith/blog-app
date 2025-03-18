"use client";

// src/utils/helperFn.js
import { useRouter, useSearchParams } from "next/navigation";

/* export const useRoutingHelpers = () => {
  const router = useRouter();

  const handleTagClick = (tag) => {
    router.push(`/category?tag=${tag}`);
  };

  return { handleTagClick };
}; */

export const useRoutingHelpers = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = (tag) => {
      const params = new URLSearchParams(searchParams.toString());

      if (tag) {
          params.set("tag", tag);
      } else {
          params.delete("tag"); // Ensure tag is removed
      }

      //router.push(`?${params.toString()}`, { scroll: false });
      router.push(`category/?${params.toString()}`, { scroll: false });
  };

  return { handleTagClick };
};




/* Add the images inside the html */
/* export const renderBlogContentWithImages = (htmlContent, relatedImages) => {
  let modifiedContent = htmlContent;

  relatedImages.forEach((imageURL, index) => {
    const placeholder = `![RELATED_IMAGE_${index + 1}_PLACEHOLDER]`;
    const imageTag = `<img src="${imageURL}" alt="Related Image ${
      index + 1
    }" class="w-full rounded-lg shadow-md my-4" />`;

    modifiedContent = modifiedContent.replace(placeholder, imageTag);
  });

  return modifiedContent;
}; */

// Helper function modified to use Image component
export const renderBlogContentWithImages = (htmlContent, relatedImages) => {
  let modifiedContent = htmlContent;

  relatedImages.forEach((imageURL, index) => {
    const placeholder = `![RELATED_IMAGE_${index + 1}_PLACEHOLDER]`;
    const imageTag = `
      <figure class="w-full my-4">
        <Image
          src="${imageURL}"
          alt="Related Image ${index + 1}"
          className="related-image w-full rounded-lg shadow-md object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <figcaption class="text-gray-600 text-sm mt-2">Related Image ${index + 1}</figcaption>
      </figure>
    `;

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


/* Formate date into February 12, 2025 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  });
};
