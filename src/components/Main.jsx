"use client";

import React, { useState, useEffect } from "react";
import thumbnail from "@/assets/thumbnail.png";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { BsCalendarDate } from "react-icons/bs";
import Image from "next/image";
import blogData from "@/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleTagClick, useRoutingHelpers } from "@/utils/helperFn";
import Loader from "@/components/Loader"; // Import the Loader component

const Main = () => {
    const [popularBlogs, setPopularBlogs] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const { handleTagClick } = useRoutingHelpers();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("/api/blog");
                const data = await res.json();
                if (data.success) {
                    setPopularBlogs(data.blogs);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false); // Stop loading after fetching
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto px-4 lg:px-1 my-20">
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">Popular Blogs</h1>

            {/* Show Loader While Fetching Data */}
            {loading ? (
                <div className="flex justify-center">
                    <Loader />
                </div>
            ) : (
                /* Flexbox Layout */
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* LEFT SIDE - BLOG POSTS */}
                    <div className="flex flex-col gap-6 w-full lg:w-3/4">
                        {popularBlogs.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="p-6 rounded-xl bg-gray-100 shadow-lg flex flex-col lg:flex-row gap-6 items-center">
                                    {/* Image Section */}
                                    <div className="w-full lg:w-1/2">
                                        <Link href={`/blog/${item._id}`}>
                                            <Image
                                                src={item.thumbnail}
                                                alt="thumbnail-image"
                                                className="image-hover rounded-xl w-full"
                                                width={500}
                                                height={300}
                                                priority
                                            />
                                        </Link>
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex flex-col gap-4 w-full lg:w-1/2">
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {item.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm cursor-pointer"
                                                    onClick={() => handleTagClick(tag)}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Title */}
                                        <Link href={`/blog/${item._id}`} className="title-link">
                                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                                {item.title}
                                            </h2>
                                        </Link>

                                        {/* Description */}
                                        <p className="text-gray-700">{item.description}</p>

                                        {/* Date */}
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <BsCalendarDate size={20} />
                                            <time dateTime="2025-02-12">{(item.createdAt).split('T')[0]}</time>
                                        </div>
                                    </div>
                                </div>

                                {/* Show Ads Between Posts in Mobile View */}
                                {(index + 1) % 2 === 0 ? (
                                    <div className="lg:hidden bg-gray-200 text-center p-4 rounded-md">
                                        <Image
                                            src={thumbnail}
                                            alt="Ad Placeholder"
                                            className="rounded-xl w-full"
                                            width={500}
                                            height={300}
                                        />
                                    </div>
                                ) : null}
                            </React.Fragment>
                        ))}
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
            )}
        </div>
    );
};

export default Main;
