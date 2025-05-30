'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        We encountered an error while loading the blog content. Please try again or return to the blog home page.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors"
        >
          Try again
        </button>
        <Link
          href="/blog"
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Return to Blog
        </Link>
      </div>
    </div>
  );
} 