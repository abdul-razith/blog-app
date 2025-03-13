"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCalendarDate } from "react-icons/bs";
import { useRoutingHelpers } from "@/utils/helperFn";
import Loader from "@/components/Loader";
import thumbnail from "@/assets/thumbnail.png"; // Ad Placeholder

const Main = () => {
    const [popularBlogs, setPopularBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { handleTagClick } = useRoutingHelpers();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("/api/blog");
                const data = await res.json();
                if (data.success) setPopularBlogs(data.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto px-4 lg:px-1 my-12 min-h-[200px]">
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center mb-6">Popular Blogs</h1>

            {/* Show Loader While Fetching Data */}
            {loading ? (
                <div className="flex justify-center items-center min-h-[200px] py-24">
                    <Loader />
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* LEFT SIDE - BLOG POSTS */}
                    <div className="flex flex-col gap-6 w-full">
                        {popularBlogs.slice(0, 4).map((item, index) => (
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
                                            {item.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
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
                                            <time dateTime={item.createdAt.split("T")[0]}>
                                                {item.createdAt.split("T")[0]}
                                            </time>
                                        </div>
                                    </div>
                                </div>

                                {/* Show Ads Between Posts in Mobile View */}
                                {/* Ads will appear after every 2nd post in mobile view */}
                                {/* {index % 2 === 1 && (
                                    <div className="lg:hidden bg-gray-200 text-center p-4 rounded-md">
                                        <Image
                                            src={thumbnail}
                                            alt="Ad Placeholder"
                                            className="rounded-xl w-full"
                                            width={500}
                                            height={300}
                                        />
                                    </div>
                                )} */}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* RIGHT SIDE - FIXED ADS (ONLY FOR LAPTOP VIEW) */}
                    {/* Ads section optimized and uncommented only if required */}
                    {/* Uncomment the below block if you want fixed ads on laptops */}
                    {/* 
                    <aside className="hidden lg:flex flex-col gap-6 w-1/4 sticky top-4 h-screen">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="bg-gray-200 text-center p-4 rounded-md">
                                <Image
                                    src={thumbnail}
                                    alt={`Ad Placeholder ${i + 1}`}
                                    className="rounded-xl w-full"
                                    width={300}
                                    height={250}
                                />
                            </div>
                        ))}
                    </aside> 
                    */}
                </div>
            )}
        </div>
    );
};

export default Main;
