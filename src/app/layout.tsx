import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import AuthProvider from "@/context/AuthProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap", 
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: {
    default: "Hoang An Store",
    template: "%s | Hoang An Store",
  },
  description: "High-performance E-commerce store.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode}>) {
  return (
    <html lang="en" className={inter.className}>
     <body className="min-h-screen bg-brand-light flex flex-col antialiased">
        <Toaster position="top-right" richColors closeButton />
        <AuthProvider>
          <Header />
          <div className="flex grow relative">
            <SideBar />

            <main className="grow max-w-7xl w-full mx-auto px-4 py-4">
              {children}
            </main>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
