"use client"; // Runs on the client side (browser)

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi"; // Logout Icon

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Remove admin session
    router.push("/login"); // Redirect to login page
  };

  return (
    <aside className="bg-red-500 px-3 py-6 w-full flex flex-col gap-y-6 min-h-screen">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      <ul className="flex flex-col gap-y-5">
        <li className="bg-blue-400 rounded-lg p-2">
          <Link href="/admin/addBlog" className="flex items-center justify-between">
            <span>Add Blog Post</span>
            <IoIosAddCircleOutline size={30} />
          </Link>
        </li>

        <li className="bg-blue-400 rounded-lg p-2">
          <Link href="/admin/blogList" className="flex items-center justify-between">
            <span>Blog List</span>
            <FaList size={26} />
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-gray-800 text-white flex items-center justify-center p-3 rounded-lg hover:bg-gray-600"
      >
        <FiLogOut size={24} className="mr-2" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
