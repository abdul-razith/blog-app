"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { BsCalendarDate } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import thumbnail from "@/assets/thumbnail.png";
import blogData from "@/data";
import Link from "next/link";

const Hero = () => {
  const swiperRef = useRef(null);

  const [recentBlog, setRecentBlog] = useState(blogData.slice(0, 5));

  return (
    <div className="relative py-6 mt-3 bg-gray-200">
      <div className="container mx-auto px-4 lg:px-8 xl:px-2">

        {/* Navigation Buttons - Shown only on lg (1024px and above) */}
        <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-2 z-10">
          <button
            className="p-3 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-900 transition"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FaChevronLeft size={24} />
          </button>
        </div>

        <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-2 z-10">
          <button
            className="p-3 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-900 transition"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* Swiper Slider */}
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 9000, disableOnInteraction: false }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay, Navigation]}
        >
          {recentBlog.map((item, index) => (
            <SwiperSlide key={index}>

              <div className={`p-6 rounded-xl ${item.bgColor}`}>
                <div className="flex flex-col lg:flex-row gap-6 items-center">
                  {/* Image Section */}
                  <div className="order-1 lg:order-1 w-full lg:w-1/2">
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
                  <div className="order-1 lg:order-2 flex flex-col gap-4 w-full lg:w-1/2">
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
                      <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                        {item.title}
                      </h1>
                    </Link>

                    {/* Description */}
                    <p className="text-gray-700">{item.description}</p>

                    {/* Read More Button */}
                    <Link href={`/blog/${item.id}`}>
                      <button className="bg-red-600 text-white flex items-center gap-2 px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200 w-fit">
                        <span>Continue Reading</span>
                        <LiaLongArrowAltRightSolid size={24} />
                      </button>
                    </Link>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <BsCalendarDate size={20} />
                      <time dateTime="2025-02-12">{item.date}</time>
                    </div>
                  </div>
                </div>
              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
