"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center bg-white border border-brand-sand/60 rounded-2xl p-8 shadow-sm">
        {/* Large 404 Badge / Icon */}
        <div className="relative mb-6">
          <h1 className="text-8xl font-black text-brand-dark tracking-tighter opacity-10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl">🛍️</span>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-brand-dark mb-2">
          Page Not Found
        </h2>
        <p className="text-brand-slate text-sm leading-relaxed mb-8">
          Oops! The product or page you are looking for might have been moved,
          renamed, or no longer exists in our store.
        </p>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Go Back Button */}
          <button
            onClick={() => router.back()}
            className="w-full bg-brand-light hover:bg-brand-sand/30 text-brand-dark font-medium py-3 px-5 rounded-xl border border-brand-sand transition duration-200 text-sm"
          >
            ← Go Back
          </button>

          {/* Return to Home / Store */}
          <Link
            href="/"
            className="w-full bg-brand-rust hover:bg-brand-rust/90 text-white font-medium py-3 px-5 rounded-xl transition duration-200 text-sm flex items-center justify-center shadow-sm"
          >
            Back to Store
          </Link>
        </div>

        {/* Quick Links Help */}
        <div className="mt-8 pt-6 border-t border-brand-sand/40 text-xs text-brand-slate">
          Looking for something specific? Check your{" "}
          <Link
            href="/myPurchases"
            className="text-brand-rust hover:underline font-semibold"
          >
            My Purchases
          </Link>{" "}
          or return to the main catalog.
        </div>
      </div>
    </div>
  );
}

export default NotFound;