"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import thumbnail from "@/assets/thumbnail.png";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { BsCalendarDate } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import blogData from "@/data";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRoutingHelpers } from "@/utils/helperFn";
import Loader from "./Loader";

const CategoriesComps = () => {

    const [blogsList, setBlogsList] = useState([]);
    const searchParams = useSearchParams();
    const tag = searchParams.get('tag');

    const { handleTagClick } = useRoutingHelpers();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("/api/blog");
                const data = await res.json();
                if (data.success) {
                    setBlogsList(data.blogs); // Show only 5 recent blogs
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    // State for search input
    const [searchQuery, setSearchQuery] = useState("");

    // State for selected tag filter
    const [selectedTag, setSelectedTag] = useState(tag || null);

    // Get all unique tags for filtering
    const allTags = [...new Set(blogsList.flatMap(post => post.tags))];

    // Filter posts based on search query or selected tag
    const filteredPosts = blogsList.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

        return matchesSearch && matchesTag;
    });

    return (
        <div className="container mx-auto px-4 lg:px-1 my-10 min-h-screen">
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Explore Categories</h1>

            {/* Search Bar & Tag Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                {/* Search Bar */}
                <div className="flex items-center w-full md:w-[70%] lg:w-[35%] bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm">
                    <BiSearch size={24} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search blog posts..."
                        className="w-full px-3 py-1 outline-none text-gray-800"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Tag Filter */}
                <div className="flex flex-wrap gap-3">
                    <button
                        className={`px-4 py-2 rounded-lg ${!selectedTag ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                        onClick={() => setSelectedTag(null)}
                    >
                        All
                    </button>
                    {allTags.map((tag, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-lg ${selectedTag === tag ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                            onClick={() => setSelectedTag(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blog Posts Section */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* LEFT SIDE - BLOG POSTS */}
                <div className="flex flex-col gap-6 w-full lg:w-3/4">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="p-6 rounded-xl bg-white shadow-md flex flex-col lg:flex-row gap-6 items-center border border-gray-200">
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
                                                    className="bg-red-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-red-600"
                                                    onClick={() => handleTagClick(tag)}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Title */}
                                        <Link href={`/blog/${item._id}`} className="title-link">
                                            <h2 className="text-3xl md:text-4xl font-bold leading-tigh">
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
                                {(index + 1) % 2 === 0 && (
                                    <div className="lg:hidden bg-gray-200 text-center p-4 rounded-md">
                                        <Image
                                            src={thumbnail}
                                            alt="Ad Placeholder"
                                            className="rounded-xl w-full"
                                            width={500}
                                            height={300}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <div className="flex justify-center">
                            <Loader />
                        </div>
                    )}
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

const Categories = () => {
    <Suspense fallback={<div>Loading...</div>}>
      <CategoriesComps />
    </Suspense>
}

export default Categories;
