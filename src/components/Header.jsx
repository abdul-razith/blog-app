"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import logo from "@/assets/logo.png"

import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';

const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className='bg-pink-500 z-50'>
      <div className='px-3 py-4 md:px-4 md:py-5 lg:px-6 lg:py-6 xl:px-10 font-semibold flex justify-between items-center'>

        <div className='w-[35%] sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[15%] cursor-pointer'>
          <Image src={logo} alt='main-logo' className='w-full h-full' />
        </div>

        <div className='cursor-pointer lg:hidden' onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? <FiMenu className='text-white text-3xl md:text-4xl' /> : <FiX className='text-white text-3xl md:text-4xl' />}
        </div>

        <div className={`absolute w-[98%] pb-3 lg:pb-0 mx-[1%] lg:static lg:w-[60%] top-[5.3rem] md:top-[7.2rem] left-0 bg-pink-500 ${isOpen ? "block" : "hidden"} lg:block z-50`}>
          <ul className='relative mx-3 pl-5 py-2 flex flex-col lg:flex-row lg:justify-between bg-white lg:bg-pink-500 lg:text-white rounded-md'>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/category">Category</Link></li>
          </ul>
        </div>

        <div className='hidden md:block'>
          <button className='md:border-2 md:rounded-md md:py-3 md:px-6 text-white hover:bg-white hover:text-pink-500'>Get It Now</button>
        </div>

      </div>
    </nav>
  )
}

export default Header