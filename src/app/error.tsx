"use client"; // Error boundaries must be Client Components in Next.js

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Caught error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        {/* Error Icon / Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full text-2xl font-bold">
          !
        </div>

        {/* Heading & Description */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Something went wrong!
          </h1>
          <p className="text-sm text-gray-600">
            We encountered an unexpected error while loading this page. You can try refreshing or return to the homepage.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Try Again Button (Calls Next.js reset to re-render segment) */}
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Try again
          </button>

          {/* Fallback Home Link */}
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}