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
import Loader from "./Loader";

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
    <div className="relative py-6 mt-3">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px] py-24">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto px-4 lg:px-8 xl:px-2 shadow-2xl rounded-3xl">
          {/* Navigation Buttons */}
          {["left-2", "right-2"].map((position, i) => (
            <button
              key={i}
              className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 ${position} z-10 p-3 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-800 transition`}
              onClick={() => (i === 0 ? swiperRef.current?.slidePrev() : swiperRef.current?.slideNext())}
              aria-label={i === 0 ? "Previous Slide" : "Next Slide"} // ✅ Fix: Add accessible labels
            >
              {i === 0 ? <FaChevronLeft size={24} /> : <FaChevronRight size={24} />}
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
          >
            {recentBlog.slice(0, 3).map(({ _id, thumbnail, tags, title, description, createdAt }, index) => (
              <SwiperSlide key={index}>
                <div className="p-6 rounded-lg">
                  <div className="flex flex-col lg:flex-row gap-6 items-center">

                    {/* Image Section */}
                    <Link href={`/blog/${_id}`} className="order-1 lg:order-1 w-full lg:w-1/2">
                      <Image
                        src={thumbnail}
                        alt="thumbnail-image"
                        className="image-hover rounded-lg w-full"
                        width={500}
                        height={300}
                        priority
                      />
                    </Link>

                    {/* Content Section */}
                    <div className="order-1 lg:order-2 flex flex-col gap-4 w-full lg:w-1/2">

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
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{title}</h1>
                      </Link>

                      {/* Description */}
                      <p className="text-gray-700">{description}</p>

                      {/* Read More Button */}
                      <Link href={`/blog/${_id}`}>
                        <button className="bg-gray-700 text-white flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200 w-fit">
                          <span>Continue Reading</span>
                          <LiaLongArrowAltRightSolid size={24} />
                        </button>
                      </Link>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-gray-600">
                        <BsCalendarDate size={20} />
                        <time dateTime={createdAt.split("T")[0]}>{createdAt.split("T")[0]}</time>
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
