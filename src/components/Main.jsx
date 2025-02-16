"use client";

import React, { useState } from "react";
import thumbnail from "@/assets/thumbnail.png";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { BsCalendarDate } from "react-icons/bs";
import Image from "next/image";
import blogData from "@/data";
import Link from "next/link";

const Main = () => {

    const [data, setData] = useState(blogData.slice(0, 6));

    return (
        <div className="container mx-auto px-4 lg:px-1 my-20">
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center mb-10">Popular Blogs</h1>

            {/* Flexbox Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* LEFT SIDE - BLOG POSTS */}
                <div className="flex flex-col gap-6 w-full lg:w-3/4">
                    {data.map((item, index) => (
                        <React.Fragment key={index}>
                            <div className="p-6 rounded-xl bg-gray-100 shadow-md flex flex-col lg:flex-row gap-6 items-center">
                                {/* Image Section */}
                                <div className="w-full lg:w-1/2">
                                    <Link href={`/blog/${item.id}`}>
                                        <Image
                                            src={thumbnail}
                                            alt="thumbnail-image"
                                            className="rounded-xl w-full"
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
                                                className="bg-red-500 text-white px-3 py-1 rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Title */}
                                    <Link href={`/blog/${item.id}`}>
                                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                            {item.title}
                                        </h2>
                                    </Link>

                                    {/* Description */}
                                    <p className="text-gray-700">{item.description}</p>

                                    {/* Date */}
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <BsCalendarDate size={20} />
                                        <time dateTime="2025-02-12">{item.date}</time>
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
        </div>
    );

};

export default Main;
