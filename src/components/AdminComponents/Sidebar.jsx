import Link from 'next/link'
import React from 'react'

import { IoIosAddCircleOutline } from "react-icons/io";
import { FaList } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <aside className='bg-red-500 px-3 py-6 w-full flex flex-col gap-y-6'>
      <h1 className='text-2xl font-bold'>Side Bar Menu</h1>
      <ul className='flex flex-col gap-y-5'>

        <li className='bg-blue-400 rounded-lg p-2'>
          <Link href="/admin/addBlog" className='flex items-center justify-between'>
            <span>Add Blog Post</span>
            <IoIosAddCircleOutline size={30} />
          </Link>
        </li>

        <li  className='bg-blue-400 rounded-lg p-2'>
          <Link href="/admin/blogList" className='flex items-center justify-between'>
            <span>Blog List</span>
            <FaList size={26} />
          </Link>
        </li>

      </ul>
    </aside>
  )
}

export default Sidebar