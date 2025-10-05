"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/extractuser");
      console.log(res.data);
      setData(res.data.userData._id);
    } catch (error) {
      console.error("Failed to get user:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Profile Page
        </h1>

        <div className="mb-6">
          <h2 className="text-lg mb-2 text-gray-700 dark:text-gray-300">User ID:</h2>
          <div className="p-3 bg-green-500 rounded-md text-white font-mono">
            {data === "" ? (
              "Nothing"
            ) : (
              <Link
                href={`/profile/${data}`}
                className="underline hover:text-yellow-200"
              >
                {data}
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={getUserDetails}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow"
          >
            Get User Details
          </button>

          <button
            onClick={logout}
            className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
