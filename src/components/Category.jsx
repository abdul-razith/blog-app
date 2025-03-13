"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCalendarDate } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { useRoutingHelpers } from "@/utils/helperFn";
import PageLoader from "./PageLoader";

const CategoriesComps = () => {
  const [blogsList, setBlogsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag");
  const { handleTagClick } = useRoutingHelpers();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true); // Start loading
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (data.success) {
          setBlogsList(data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchBlogs();
  }, []);

  // Get all unique tags
  const allTags = [...new Set(blogsList.flatMap((post) => post.tags))];

  // Filtered blog posts
  const filteredPosts = blogsList.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="container mx-auto px-4 lg:px-8 xl:px-2 my-12 min-h-[200px]">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Explore Categories</h1>

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
            className={`px-4 py-2 rounded-lg ${
              !selectedTag
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => handleTagClick(null)}
          >
            All
          </button>
          {allTags.map((tag, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg ${
                selectedTag === tag
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT SIDE - BLOG POSTS */}
        <div className="flex flex-col gap-6 w-full">
          {loading ? ( // Show loader while loading
            <div className="flex flex-col justify-center items-center gap-6 h-screen w-full">
              <PageLoader message="Loading categories..." />
            </div>
          ) : filteredPosts.length > 0 ? ( // Show posts if available
            filteredPosts.map((item, index) => (
              <React.Fragment key={index}>
                <div className="p-4 rounded-2xl bg-gray-100 shadow-md flex flex-col lg:flex-row gap-4 items-center">
                  {/* Image Section */}
                  <div className="w-full lg:w-1/2 relative h-[300px] md:h-[300px]">
                    <Link href={`/blog/${item._id}`}>
                      <Image
                        src={item.thumbnail}
                        alt="thumbnail-image"
                        className="rounded-2xl object-cover w-full h-full image-hover"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </Link>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col gap-3 w-full lg:w-1/2">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-red-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-800 transition"
                          onClick={() => handleTagClick(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Title */}
                    <Link href={`/blog/${item._id}`} className="title-link">
                      <h2 className="text-2xl md:text-3xl font-bold leading-snug md:leading-tight">
                        {item.title}
                      </h2>
                    </Link>

                    {/* Description */}
                    <p className="text-gray-700 line-clamp-3 md:line-clamp-4">{item.description}</p>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <BsCalendarDate size={18} />
                      <time dateTime={item.createdAt.split("T")[0]}>
                        {new Date(item.createdAt).toLocaleDateString()}
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
                      className="rounded-2xl w-full"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )} */}
              </React.Fragment>
            ))
          ) : !loading ? ( // Show "Blog not found" message when not loading and no posts
            <div className="flex flex-col justify-center items-center gap-6 h-screen w-full">
              <p className="text-xl text-gray-600">No blogs found matching your search.</p>
            </div>
          ) : null}
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
                className="rounded-2xl w-full"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </aside> 
        */}
      </div>
    </div>
  );
};

export default CategoriesComps;
