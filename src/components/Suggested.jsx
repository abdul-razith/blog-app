"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BsCalendarDate } from "react-icons/bs";
import Link from "next/link";
import { formatDate, useRoutingHelpers } from "@/utils/helperFn";
import PageLoader from "./PageLoader";

const Suggested = ({ blogs }) => {
  const { handleTagClick } = useRoutingHelpers();

  /* const [suggestBlogs, setSuggestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (data.success) setSuggestBlogs(data.blogs.slice(0, 4)); // Fetch and limit to 4 blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []); */

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h1 className="text-4xl font-bold text-center mb-6">Suggested Posts</h1>

        {/* Show Loader While Fetching Data */}
        {blogs.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px] py-24">
            <PageLoader message="Fetching suggested posts..." />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogs.map(({ _id, thumbnail, title, tags, createdAt }, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Thumbnail */}

                <div className="relative w-full h-44 md:h-60">
                  <Link href={`/blog/${_id}`}>
                    <Image
                      src={thumbnail}
                      alt={title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-2xl image-hover"
                    />
                  </Link>
                </div>


                {/* Blog Details */}
                <div className="p-4 flex flex-col gap-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-red-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-800 transition"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${_id}`} className="title-link">
                    <h2 className="text-lg font-semibold">{title}</h2>
                  </Link>

                  {/* Date */}
                  <time dateTime={createdAt.split("T")[0]}>
                    {formatDate(createdAt)}
                  </time>
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
