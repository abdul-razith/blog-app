"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { BsCalendarDate } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { useRoutingHelpers } from "@/utils/helperFn";
import PageLoader from "./PageLoader";

const Hero = () => {
  const swiperRef = useRef(null);
  const [recentBlog, setRecentBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleTagClick } = useRoutingHelpers();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (data.success) setRecentBlog(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="relative py-4 mt-3 md:py-6">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px] py-24">
          <PageLoader message="Slider is loading..." />
        </div>
      ) : (
        <div className="container mx-auto px-4 lg:px-8 xl:px-2 shadow-xl rounded-xl bg-white">
          {/* Navigation Buttons */}
          {["left-2", "right-2"].map((position, i) => (
            <button
              key={i}
              className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 ${position} z-10 p-2 bg-gray-700/80 text-white rounded-full shadow-lg hover:bg-gray-800 transition backdrop-blur-sm`}
              onClick={() => (i === 0 ? swiperRef.current?.slidePrev() : swiperRef.current?.slideNext())}
              aria-label={i === 0 ? "Previous Slide" : "Next Slide"}
            >
              {i === 0 ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
            </button>
          ))}

          {/* Swiper Slider */}
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 9000, disableOnInteraction: false }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 1.2 },
              1280: { slidesPerView: 1.5 },
            }}
          >
            {recentBlog.slice(0, 3).map(({ _id, thumbnail, tags, title, description, createdAt }, index) => (
              <SwiperSlide key={index}>
                <div className="p-4 md:p-6 rounded-lg">
                  <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-center">
                    {/* Image Section */}
                    <Link href={`/blog/${_id}`} className="relative w-full lg:w-1/2 h-[300px] md:h-[400px]">
                      <Image
                        src={thumbnail}
                        alt={`${title} thumbnail`}
                        className="rounded-lg object-cover image-hover"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </Link>

                    {/* Content Section */}
                    <div className="flex flex-col gap-3 md:gap-4 w-full lg:w-1/2">
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
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug md:leading-tight">
                          {title}
                        </h1>
                      </Link>

                      {/* Description */}
                      <p className="text-gray-600 text-sm md:text-base line-clamp-3 md:line-clamp-4">
                        {description}
                      </p>

                      {/* Read More Button */}
                      <Link href={`/blog/${_id}`}>
                        <button className="bg-gray-700 text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 text-sm md:text-base">
                          Continue Reading
                          <LiaLongArrowAltRightSolid size={18} />
                        </button>
                      </Link>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <BsCalendarDate size={16} />
                        <time dateTime={createdAt.split("T")[0]}>
                          {new Date(createdAt).toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Hero;
