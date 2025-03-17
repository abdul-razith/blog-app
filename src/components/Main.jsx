"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCalendarDate } from "react-icons/bs";
import { formatDate, useRoutingHelpers } from "@/utils/helperFn";
import thumbnail from "@/assets/thumbnail.png"; // Ad Placeholder
import PageLoader from "./PageLoader";

const Main = ({ blogs }) => {
  const { handleTagClick } = useRoutingHelpers();

  /* const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
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
  }, []); */

  return (
    <div className="container mx-auto px-4 lg:px-8 xl:px-2 my-12 min-h-[200px]">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Popular Blogs</h1>

      {/* Show Loader While Fetching Data */}
      {blogs.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px] py-24">
          <PageLoader message="Fetching popular posts..." />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT SIDE - BLOG POSTS */}
          <div className="flex flex-col gap-6 w-full">
            {blogs.slice(0, 4).map((item, index) => (
              <React.Fragment key={index}>
                <div className="p-4 rounded-2xl bg-gray-100 shadow-md flex flex-col lg:flex-row gap-4 items-center">
                  {/* Image Section */}
                  <div className="w-full lg:w-1/2 relative h-[300px] md:h-[300px]">
                    <Link href={`/blog/${item._id}`}>
                      <Image
                        src={item.thumbnail}
                        alt={`Thumbnail for ${item.title}`}
                        className="rounded-2xl image-hover"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                        style={{ objectFit: "cover" }} // Correct way to apply object-fit
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
                        {formatDate(item.createdAt)}
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
                  className="rounded-2xl w-full"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </aside> 
          */}

          {/* <!-- RIGHT SIDE - FIXED ADS (ONLY FOR LAPTOP VIEW) --> */}
          {/* 
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
                */}
        </div>
      )}
    </div>
  );
};

export default Main;
