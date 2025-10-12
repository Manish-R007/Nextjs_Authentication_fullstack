'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = searchParams.get('token');
    if (t) {
      setToken(decodeURIComponent(t)); // decode the URL-encoded token
    } else {
      // No token provided -> redirect to profile or login
      router.push('/profile');
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Verify Email</h1>
        <div className="mb-6">
          <h2 className="text-lg mb-2 text-gray-700 dark:text-gray-300">Token:</h2>
          <div className="p-3 bg-orange-500 rounded-md text-black font-mono">
            {token || 'No token found'}
          </div>
        </div>
      </div>
    </div>
  );
}
