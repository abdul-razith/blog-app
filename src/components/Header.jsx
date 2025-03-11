"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";

import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 z-50">
      <div className="px-3 py-4 md:px-4 md:py-5 lg:px-6 lg:py-6 xl:px-10 font-semibold flex justify-between items-center">
        {/* Logo Section */}
        <div className="w-[35%] sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[15%] cursor-pointer">
          <Link href="/">
            <Image src={logo} alt="main-logo" className="w-full h-full" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="cursor-pointer lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FiX className="text-white text-3xl md:text-4xl" />
          ) : (
            <FiMenu className="text-white text-3xl md:text-4xl" />
          )}
        </div>

        {/* Navigation Menu */}
        <div
          className={`absolute w-[98%] pb-3 lg:pb-0 mx-[1%] lg:static lg:w-[60%] xl:w-[50%] top-[4.0rem] md:top-[5.9rem] left-0 bg-gray-900 ${
            isOpen ? "block" : "hidden"
          } lg:block z-50`}
        >
          <ul className="relative mx-3 pl-5 py-2 flex flex-col gap-y-4 lg:flex-row lg:justify-between bg-gray-900 text-white rounded-md">
            <li className="nav-link">
              <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li className="nav-link">
              <Link href="/category" onClick={() => setIsOpen(false)}>Category</Link>
            </li>
            <li className="nav-link">
              <Link href="/about" onClick={() => setIsOpen(false)}>About Us</Link>
            </li>
            <li className="nav-link">
              <Link href="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
