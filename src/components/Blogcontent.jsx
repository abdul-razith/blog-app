"use client";

import React from "react";
import thumbnail from "@/assets/thumbnail.png";
import { BsCalendarDate } from "react-icons/bs";
import Image from "next/image";
import blogData from "@/data";
import { useParams, useRouter } from "next/navigation";

const Blogcontent = () => {
    const { id } = useParams(); // Get the blog ID from the URL
    const router = useRouter();

    const currentIndex = blogData.findIndex((post) => post.id === id);
    const data = blogData[currentIndex]; // Get the current blog post

    // Get the previous and next posts
    const prevPost = currentIndex > 0 ? blogData[currentIndex - 1] : null;
    const nextPost = currentIndex < blogData.length - 1 ? blogData[currentIndex + 1] : null;

    if (!data) {
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
                                src={thumbnail}
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
                                {data.tags.map((tag, index) => (
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
                                {data.title}
                            </h2>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-gray-600">
                                <BsCalendarDate size={20} />
                                <time dateTime={data.date}>{data.date}</time>
                            </div>

                            {/* Description */}
                            <h2 className="text-xl font-bold">Description</h2>
                            <p className="text-gray-700">{data.description}</p>

                            {/* Blog Content - Rendering HTML String */}
                            <div
                                className="text-gray-800 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: data.blogContent }}
                            ></div>
                        </div>

                        {/* Next & Previous post navigation */}
                        <div className="flex flex-col sm:flex-row justify-between w-full mt-6 gap-4 sm:gap-6">
                            {/* Previous Post */}
                            {prevPost && (
                                <div className="w-full sm:w-[50%]">
                                    <button
                                        onClick={() => router.push(`/blog/${prevPost.id}`)}
                                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 flex items-center gap-3 w-full"
                                    >
                                        {/* Show Image Only from 768px (md) */}
                                        <div className="hidden md:block w-[30%]">
                                            <Image
                                                src={thumbnail}
                                                alt="Previous Post Thumbnail"
                                                className="rounded-md w-full"
                                            />
                                        </div>

                                        <div className="text-left w-full md:w-[70%]">
                                            <span className="text-sm sm:text-lg text-green-500 font-semibold block mb-1">
                                                Previous Post
                                            </span>
                                            <p className="font-semibold text-xs sm:text-sm md:text-base break-words">
                                                {prevPost.title}
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            )}

                            {/* Next Post */}
                            {nextPost && (
                                <div className="w-full sm:w-[50%] flex sm:justify-end">
                                    <button
                                        onClick={() => router.push(`/blog/${nextPost.id}`)}
                                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 flex items-center gap-3 w-full"
                                    >
                                        {/* Show Image Only from 768px (md) */}
                                        <div className="hidden md:block w-[30%]">
                                            <Image
                                                src={thumbnail}
                                                alt="Next Post Thumbnail"
                                                className="rounded-md w-full"
                                            />
                                        </div>

                                        <div className="text-left w-full md:w-[70%]">
                                            <span className="text-sm sm:text-lg text-green-500 font-semibold block mb-1">
                                                Next Post
                                            </span>
                                            <p className="font-semibold text-xs sm:text-sm md:text-base break-words">
                                                {nextPost.title}
                                            </p>
                                        </div>
                                    </button>
                                </div>
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
