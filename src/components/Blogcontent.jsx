"use client";

import React, { useEffect, useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { renderBlogContentWithImages, useRoutingHelpers } from "@/utils/helperFn";
import parse from "html-react-parser";
import PageLoader from "./PageLoader";

const Blogcontent = () => {
  const { id } = useParams();
  const router = useRouter();
  const { handleTagClick } = useRoutingHelpers();

  const [blog, setBlog] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [blogRes, blogsRes] = await Promise.all([
          fetch(`/api/blog?id=${id}`),
          fetch(`/api/blog`),
        ]);

        const blogData = await blogRes.json();
        const blogsData = await blogsRes.json();

        if (blogData.success) setBlog(blogData.blog);
        else console.error("Blog not found:", blogData.message);

        if (blogsData.success) {
          const sortedBlogs = (blogsData.blogs || []).sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          const currentIndex = sortedBlogs.findIndex((blog) => String(blog._id) === String(id));

          setPrevPost(currentIndex > 0 ? sortedBlogs[currentIndex - 1] : null);
          setNextPost(currentIndex < sortedBlogs.length - 1 ? sortedBlogs[currentIndex + 1] : null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PageLoader message="Loading blog content..." />
      </div>
    );
  }

  if (!blog) return <p className="text-center text-xl mt-10">Blog not found!</p>;

  const finalContent = renderBlogContentWithImages(blog.blogContent, blog.relatedImages);

  return (
    <div className="container mx-auto px-4 lg:px-8 xl:px-2 my-20">
      <div className="flex flex-col lg:flex-row justify-center gap-6">
        <div className="flex flex-col gap-6 w-full lg:w-[65%]">
          <div className="p-6 rounded-2xl bg-gray-100 shadow-md flex flex-col gap-6 items-center">
            <div className="w-full relative h-[300px] md:h-[400px]">
              <Image
                src={blog.thumbnail}
                alt={`Thumbnail for ${blog.title}`}
                className="rounded-2xl object-cover w-full h-full"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="flex flex-col gap-y-8 w-full">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-red-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-800 transition"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <BsCalendarDate size={18} />
                <time dateTime={blog.createdAt.split("T")[0]}>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </time>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold leading-snug md:leading-tight">
                {blog.title}
              </h2>

              <div>
                <h2 className="text-xl font-bold">Description</h2>
                <p className="text-gray-700 line-clamp-3 md:line-clamp-4">{blog.description}</p>
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
        </div>

        {/* Optimized Commented Code: Ad Placeholders */}
        {/* 
        <aside className="hidden lg:flex flex-col gap-6 w-1/4 sticky top-4 h-screen">
          <div className="bg-gray-200 text-center p-4 rounded-md">
            <Image src={blog.thumbnail} alt="Ad Placeholder 2" className="rounded-xl w-full" width={300} height={250} />
          </div>
          <div className="bg-gray-200 text-center p-4 rounded-md">
            <Image src={blog.thumbnail} alt="Ad Placeholder 3" className="rounded-xl w-full" width={300} height={250} />
          </div>
        </aside> 
        */}
      </div>
    </div>
  );
};

export default Blogcontent;
