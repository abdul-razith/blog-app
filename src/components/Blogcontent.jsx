"use client";

import React, { useEffect, useState } from "react";
import thumbnail from "@/assets/thumbnail.png";
import { BsCalendarDate } from "react-icons/bs";
import Image from "next/image";
import blogData from "@/data";
import { useParams, useRouter } from "next/navigation";

const Blogcontent = () => {
    const { id } = useParams(); // Get the blog ID from the URL
    const router = useRouter();

    const [blog, setBlog] = useState(null);
    const [prevPost, setPrevPost] = useState(null);
    const [nextPost, setNextPost] = useState(null);

    console.log("BLOG ID FROM URL :", id);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blog?id=${id}`);
                const data = await res.json();
                if (data.success) {
                    setBlog(data.blogs);
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        const fetchAdjacentBlogs = async () => {
            try {
                const res = await fetch(`/api/blog`); // Fetch all blogs
                const data = await res.json();

                if (data.success) {
                    const blogs = data.blogs;
                    const currentIndex = blogs.findIndex(blog => blog._id === id);

                    // Get the previous and next posts
                    setPrevPost(currentIndex > 0 ? blogs[currentIndex - 1] : null);
                    setNextPost(currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null);
                }
            } catch (error) {
                console.error("Error fetching adjacent blogs:", error);
            }
        };

        fetchBlog();
        fetchAdjacentBlogs();
    }, [id]);

    if (!blog) {
        return <p className="text-center text-xl mt-10">Blog not found!</p>;
    }

    return (
        <div className="container mx-auto px-4 lg:px-1 my-20">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* LEFT SIDE - BLOG POSTS */}
                <div className="flex flex-col gap-6 w-full lg:w-3/4">
                    <div className="p-6 rounded-xl bg-gray-100 shadow-md flex flex-col gap-6 items-center">
                        {/* Image Section */}
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

                        {/* Content Section */}
                        <div className="flex flex-col gap-4 w-full">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-red-500 text-white px-3 py-1 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                {blog.title}
                            </h2>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-gray-600">
                                <BsCalendarDate size={20} />
                                <time dateTime={blog.createdAt}>{blog.createdAt}</time>
                            </div>

                            {/* Description */}
                            <h2 className="text-xl font-bold">Description</h2>
                            <p className="text-gray-700">{blog.description}</p>

                            {/* Blog Content - Rendering HTML String */}
                            <div
                                className="text-gray-800 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: blog.blogContent }}
                            ></div>
                        </div>

                        {/* Next & Previous post navigation */}
                        <div className="flex flex-col sm:flex-row justify-between w-full mt-6 gap-4 sm:gap-6">
                            {/* Previous Post */}
                            {prevPost ? (
                                <div className="w-full sm:w-[50%]">
                                    <button
                                        onClick={() => router.push(`/blog/${prevPost._id}`)}
                                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 flex items-center gap-3 w-full"
                                    >
                                        {/* Show Image Only from 768px (md) */}
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
                                <div className="hidden sm:block w-[50%]"></div> // Empty div to keep layout balance
                            )}

                            {/* Next Post */}
                            {nextPost ? (
                                <div className={`w-full sm:w-[50%] flex ${!prevPost ? 'sm:justify-start' : 'sm:justify-end'}`}>
                                    <button
                                        onClick={() => router.push(`/blog/${nextPost._id}`)}
                                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 flex items-center gap-3 w-full"
                                    >
                                        {/* Show Image Only from 768px (md) */}
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
                                <div className="hidden sm:block w-[50%]"></div> // Empty div to keep layout balance
                            )}
                        </div>


                        {/* Advertisement Section */}
                        <div className="bg-gray-200 text-center p-4 rounded-md">
                            <Image
                                src={thumbnail}
                                alt="Ad Placeholder 2"
                                className="rounded-xl w-full"
                                width={300}
                                height={250}
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - FIXED ADS (ONLY FOR LAPTOP VIEW) */}
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
