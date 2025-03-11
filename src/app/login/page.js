"use client"; // Runs only in the browser
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Get stored admin credentials from localStorage
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));

    if (!storedAdmin) {
      setError("Admin not found. Please set up admin credentials.");
      return;
    }

    // Verify username & password
    if (username === storedAdmin.username && password === storedAdmin.password) {
      localStorage.setItem("isAdmin", "true"); // Mark admin as logged in
      router.push("/admin"); // Redirect to admin dashboard
    } else {
      setError("Incorrect username or password!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Admin Username"
          className="border p-2 rounded w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Admin Password"
          className="border p-2 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}
