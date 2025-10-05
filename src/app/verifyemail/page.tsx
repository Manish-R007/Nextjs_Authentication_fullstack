"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Verify Email
        </h1>

        <div className="mb-6">
          <h2 className="text-lg mb-2 text-gray-700 dark:text-gray-300">Token:</h2>
          <div className="p-3 bg-orange-500 rounded-md text-black font-mono">
            {token || "No token found"}
          </div>
        </div>

        {verified && (
          <div className="mb-4">
            <h2 className="text-2xl text-green-600 font-semibold mb-2">
              ✅ Email Verified
            </h2>
            <Link
              href="/login"
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="mb-4">
            <h2 className="text-2xl bg-red-500 text-white p-3 rounded-md">
              ❌ Verification Error
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
