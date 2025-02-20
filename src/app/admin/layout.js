import Sidebar from "@/components/AdminComponents/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex justify-between">

      <div className="w-[15%] h-screen bg-green-500">
        <Sidebar />
      </div>

      <div className="w-[80%] bg-yellow-300">
        {children}
      </div>

    </div>
  );
}
