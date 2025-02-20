"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { BsCalendarDate } from 'react-icons/bs';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import thumbnail from '@/assets/thumbnail.png';
import blogData from '@/data';
import Link from 'next/link';

const Suggested = () => {

    //const [suggest, setSuggest] = useState(blogData.slice(0, 4));

    const [suggestBlogs, setSuggestBlogs] = useState([]);
        
          useEffect(() => {
            const fetchBlogs = async () => {
              try {
                const res = await fetch("/api/blog");
                const data = await res.json();
                if (data.success) {
                    setSuggestBlogs(data.blogs); // Show only 5 recent blogs
                }
              } catch (error) {
                console.error("Error fetching blogs:", error);
              }
            };
            fetchBlogs();
          }, []);

    return (
        <div className="container mx-auto px-4 my-10">
            {/* Section Title */}
            <h1 className="text-3xl font-bold mb-6">Suggested Posts</h1>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {suggestBlogs.map((post, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        {/* Thumbnail */}
                        <div className="relative w-full h-48">
                            <Link href={`/blog/${post._id}`}>
                                <Image src={post.thumbnail} alt={post.title} layout="fill" objectFit="cover" />
                            </Link>
                        </div>

                        {/* Blog Details */}
                        <div className="p-4">
                            {/* Tags Section */}
                            <div className="flex flex-wrap gap-x-2">
                                {post.tags.map((tag, index) => (
                                    <span key={index} className="text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <Link href={`/blog/${post._id}`}>
                                <h2 className="text-lg font-semibold mt-2">{post.title}</h2>
                            </Link>
                            {/* Date */}
                            <div className="flex items-center text-gray-600 text-sm mt-2">
                                <BsCalendarDate className="mr-2" />
                                <time>{post.createdAt}</time>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Suggested;
