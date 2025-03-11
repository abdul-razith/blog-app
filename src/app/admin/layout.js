"use client"; // Client-side authentication
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/AdminComponents/Sidebar";

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/login"); // Redirect to login page if not logged in
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) return null; // Prevent showing admin content before checking auth

  return (
    <div className="flex">
      <div className="w-[15%] h-screen bg-green-500">
        <Sidebar />
      </div>
      <div className="w-[85%] bg-yellow-300 p-4">{children}</div>
    </div>
  );
}
