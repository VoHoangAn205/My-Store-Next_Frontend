"use client"
import Link from "next/link";

const BrandContext = () => (
    <div className="hidden lg:flex lg:col-span-5 bg-brand-dark relative p-12 flex-col justify-between text-white overflow-hidden border-r border-brand-sand/10">
        {/* Subtle geometric background graphic decorative element */}
        <div className="absolute inset-0 bg-radial from-brand-rust/20 via-transparent to-transparent opacity-50 pointer-events-none" />

        {/* Brand Logo Header */}
        <Link
          href="/"
          className="text-2xl font-black tracking-widest text-white relative z-10"
        >
          HOANGAN<span className="text-brand-rust">.</span>
        </Link>

        {/* Marketing Value Proposition / Micro Testimonial */}
        <div className="space-y-6 relative z-10 max-w-sm">
          <h2 className="text-3xl font-black tracking-tight leading-tight">
            The destination for elite audio hardware creators.
          </h2>
          <p className="text-sm text-brand-slate leading-relaxed">
            Join a collective of independent salesman and audio engineers
            managing premium studio logistics worldwide.
          </p>
        </div>

        {/* Footer Meta */}
        <div className="text-xs text-brand-slate relative z-10">
          &copy; 2026 HOANGAN Collective. All rights reserved.
        </div>
      </div>
);

export default BrandContext;