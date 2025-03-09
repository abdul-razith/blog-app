"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BsCalendarDate } from "react-icons/bs";
import Link from "next/link";
import { useRoutingHelpers } from "@/utils/helperFn";
import Loader from "@/components/Loader"; // Import Loader

const Suggested = () => {
  const [suggestBlogs, setSuggestBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { handleTagClick } = useRoutingHelpers();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (data.success) {
          setSuggestBlogs(data.blogs.slice(0, 4)); // Show only 4 suggested blogs
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
    <div className="py-10"> {/* Apply background color to the whole section */}
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h1 className="text-3xl font-bold text-center mb-6">Suggested Posts</h1>

        {/* Show Loader While Fetching Data */}
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestBlogs.map((post, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Thumbnail */}
                <div className="relative w-full h-48">
                  <Link href={`/blog/${post._id}`}>
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="image-hover rounded-t-xl"
                    />
                  </Link>
                </div>

                {/* Blog Details */}
                <div className="p-4 flex flex-col gap-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-red-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${post._id}`} className="title-link">
                    <h2 className="text-lg font-semibold">
                      {post.title}
                    </h2>
                  </Link>

                  {/* Date */}
                  <div className="flex items-center text-gray-600 text-sm">
                    <BsCalendarDate size={16} className="mr-2" />
                    <time>{(post.createdAt).split('T')[0]}</time>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Suggested;
