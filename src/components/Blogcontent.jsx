"use client";

import React, { useEffect, useState } from "react";
import thumbnail from "@/assets/thumbnail.png";
import { BsCalendarDate } from "react-icons/bs";
import Image from "next/image";
import blogData from "@/data";
import { useParams, useRouter } from "next/navigation";
import { useRoutingHelpers } from "@/utils/helperFn";
import parse from "html-react-parser";
import Loader from "@/components/Loader"; // Import Loader component

const Blogcontent = () => {
  const { id } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { handleTagClick } = useRoutingHelpers();

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog?id=${id}`);
        const data = await res.json();

        if (data.success) {
          setBlog(data.blog);
        } else {
          console.error("Blog not found:", data.message);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAdjacentBlogs = async () => {
      try {
        const res = await fetch(`/api/blog`);
        const data = await res.json();

        if (data.success) {
          const blogs = data.blogs || [];
          const sortedBlogs = blogs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          const currentIndex = sortedBlogs.findIndex(blog => String(blog._id) === String(id));

          setPrevPost(currentIndex > 0 ? sortedBlogs[currentIndex - 1] : null);
          setNextPost(currentIndex < sortedBlogs.length - 1 ? sortedBlogs[currentIndex + 1] : null);
        }
      } catch (error) {
        console.error("Error fetching adjacent blogs:", error);
      }
    };

    fetchBlog();
    fetchAdjacentBlogs();
  }, [id]);

  if (!blog)
    return <p className="text-center text-xl mt-10">Blog not found!</p>;

  const renderBlogContentWithImages = (htmlContent, relatedImages) => {
    let modifiedContent = htmlContent;

    relatedImages.forEach((imageURL, index) => {
      const placeholder = `![RELATED_IMAGE_${index + 1}_PLACEHOLDER]`;
      const imageTag = `<img src="${imageURL}" alt="Related Image ${index + 1}" class="w-full rounded-lg shadow-md my-4" />`;

      modifiedContent = modifiedContent.replace(placeholder, imageTag);
    });

    return modifiedContent;
  };

  const finalContent = renderBlogContentWithImages(blog.blogContent, blog.relatedImages);

  return (
    <div className="container mx-auto px-4 lg:px-1 my-20">
      <div className="flex flex-col lg:flex-row gap-6">

        {!loading ? (<div className="flex flex-col gap-6 w-full lg:w-3/4">
          <div className="p-6 rounded-xl bg-gray-100 shadow-md flex flex-col gap-6 items-center">
            <div className="w-full">
              <Image
                src={blog.thumbnail}
                alt="thumbnail-image"
                className="rounded-xl w-full"
                width={500}
                height={300}
                priority
              />
            </div>

            <div className="flex flex-col gap-y-8 w-full">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-red-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <BsCalendarDate size={20} />
                <time dateTime={(blog.createdAt).split('T')[0]}>
                  {(blog.createdAt).split('T')[0]}
                </time>
              </div>

              <h2 className="text-3xl text-gray-900 md:text-4xl font-bold leading-tight">
                {blog.title}
              </h2>

              <div>
                <h2 className="text-xl font-bold">Description</h2>
                <p className="text-gray-700">{blog.description}</p>
              </div>

              <div className="blog-content-container">{parse(finalContent)}</div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between w-full mt-6 gap-4 sm:gap-6">
              {prevPost ? (
                <div className="w-full sm:w-[50%]">
                  <button
                    onClick={() => router.push(`/blog/${prevPost._id}`)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 flex items-center gap-3 w-full"
                  >
                    <div className="hidden md:block w-[30%]">
                      <Image
                        src={prevPost.thumbnail}
                        alt="Previous Post Thumbnail"
                        className="rounded-md w-full"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="text-left w-full md:w-[70%]">
                      <span className="text-sm xl:text-base text-green-500 font-bold block mb-1">
                        Previous Post
                      </span>
                      <p className="font-semibold text-xs xl:text-sm break-words">
                        {prevPost.title}
                      </p>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="hidden sm:block w-[50%]"></div>
              )}

              {nextPost ? (
                <div
                  className={`w-full sm:w-[50%] flex ${!prevPost ? "sm:justify-start" : "sm:justify-end"
                    }`}
                >
                  <button
                    onClick={() => router.push(`/blog/${nextPost._id}`)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 flex items-center gap-3 w-full"
                  >
                    <div className="hidden md:block w-[30%]">
                      <Image
                        src={nextPost.thumbnail}
                        alt="Next Post Thumbnail"
                        className="rounded-md w-full"
                        width={100}
                        height={100}
                      />
                    </div>

                    <div className="text-left w-full md:w-[70%]">
                      <span className="text-sm xl:text-base text-green-500 font-bold block mb-1">
                        Next Post
                      </span>
                      <p className="font-semibold text-xs xl:text-sm break-words">
                        {nextPost.title}
                      </p>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="hidden sm:block w-[50%]"></div>
              )}
            </div>
          </div>
        </div>) : (
          <div className="flex justify-center items-center h-screen w-full">
            <Loader />
          </div>
        )}

        <aside className="hidden lg:flex flex-col gap-6 w-1/4 sticky top-4 h-screen">
          <div className="bg-gray-200 text-center p-4 rounded-md">
            <Image
              src={thumbnail}
              alt="Ad Placeholder 2"
              className="rounded-xl w-full"
              width={300}
              height={250}
            />
          </div>
          <div className="bg-gray-200 text-center p-4 rounded-md">
            <Image
              src={thumbnail}
              alt="Ad Placeholder 3"
              className="rounded-xl w-full"
              width={300}
              height={250}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Blogcontent;
