"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter();

  const onLogin = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const response = await axios.post("/api/users/login", user);
      console.log("API Response:", response.data);
      router.push("/profile");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || error.message || "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.email && user.password && user.password.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          {loading ? "Processing..." : "Login"}
        </h1>

        {errorMessage && (
          <p className="text-red-500 mb-4 bg-red-100 p-2 rounded">{errorMessage}</p>
        )}

        <div className="flex flex-col text-left mb-4">
          <label htmlFor="email" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />

          <label htmlFor="password" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
         <Link href='/forgotpassword'
         className="text-blue-500 hover:underline font-medium"
         >forgotpassword</Link>
        </div>

        <button
          onClick={onLogin}
          disabled={isButtonDisabled || loading}
          className={`w-full p-3 rounded-lg font-semibold text-white transition-colors ${
            isButtonDisabled || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isButtonDisabled
            ? "Enter credentials"
            : loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p className="mt-6 text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
