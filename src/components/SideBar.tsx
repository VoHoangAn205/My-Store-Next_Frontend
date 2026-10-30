'use client';
import getErrorMessage from "@/helpers/getErrorMessage";
import authService from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useUIStore } from "@/store/useUIStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

  const NAVIGATION_TABS = [
  { id: "cart", label: "Shopping Cart", icon: "fa-shopping-cart", href: "/account/cart" },
  { id: "purchases", label: "My Purchases", icon: "fa-clock", href: "/account/purchases" },
  { id: "profile", label: "Profile", icon: "fa-user-gear", href: "/account/profile" },
  { id: "createProduct", label: "Create Product", icon: "fa-file-circle-plus", href: "/manager/createProduct", requiredRole: 1984 },
  { id: "productManager", label: "Product Manager", icon: "fa-shapes", href: "/manager/productManager", requiredRole: 1984 },
  { id: "orderManager", label: "Order Manager", icon: "fa-boxes-packing", href: "/manager/orderManager", requiredRole: 1984 },
  ];


export default function SideBar() {
  const { userInfo, setAuthStatus, setAccessToken, clearLocalAuthInfo } = useAuthStore();
  const {isSidebarOpen, closeSidebar} = useUIStore();
  const router = useRouter();
  const pathName = usePathname()
  const userRoles = userInfo?.roles || [];

  
const getRoleName = (roles: number[]) => {
  if (roles.includes(5150)) return "Admin";
  if (roles.includes(1984)) return "Vendor";
  if (roles.includes(2001)) return "User";
  return "Guest";
};

  const handleLogout = async () => {
    try {
      const response = await authService.logout();
      clearLocalAuthInfo();
      setAccessToken("");
      setAuthStatus("guest");
      toast.success("Logged out");
      router.replace("/auth/login");
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
      console.error(message);
    }
  };

  const visibleTabs = NAVIGATION_TABS.filter((tab) => {
    if (!tab.requiredRole) return true;

    return userRoles.includes(tab.requiredRole);
  });

  return (
    <>
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        />
      )}
  
      <aside
        className={`
          bg-brand-dark text-white border-brand-sand/10
          fixed inset-y-0 left-0 w-64 h-full z-50 top-20
          transform transition-transform duration-300 ease-in-out p-4
          
          
          md:sticky md:top-20 md:h-[calc(100vh-5rem)] md:pt-0 md:border-r md:z-30 
          md:transform-none md:translate-x-0
          
          
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="w-full bg-brand-dark px-2 mt-3">
          <div className="flex items-center gap-3 pb-6  border-b border-brand-sand/40">
            <i className="fa-solid fa-circle-user text-brand-light text-4xl"></i>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-brand-light">
                {userInfo?.username || "Member"}
              </span>
              <span className="text-xs text-brand-slate">{getRoleName(userRoles)}</span>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 overflow-x-auto md:overflow-x-visible scrollbar-none">
          {userInfo ? (
            visibleTabs.map((tab) => {
          const isSelected = pathName === tab.href || pathName.startsWith(`${tab.href}/`);
          return (
            <Link
              key={tab.id}
              href={tab.href}
              onClick={() => closeSidebar()}
              aria-current={isSelected ? "page" : undefined}
              className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-150 whitespace-nowrap w-full text-left
                        ${
                          isSelected
                            ? "bg-brand-dark text-white shadow-sm"
                            : "text-brand-slate hover:bg-brand-light hover:text-brand-dark"
                        }`}
            >
              <div className="flex items-center gap-3">
                <i className={`fa-solid ${tab.icon} text-base`}></i>
                <span>{tab.label}</span>
              </div>
            </Link>
          );
        })
          ) : (
            <div className="flex flex-col gap-5 items-center my-3">
              <button
                onClick={() => router.push("/auth/login")}
                className="bg-brand-rust text-brand-light rounded-2xl w-full"
              >
                sign in
              </button>
              <span>Or</span>
              <button
                onClick={() => router.push("/auth/register")}
                className="border-brand-light border-2 text-brand-light rounded-2xl w-full hover:text-brand-rust hover:border-brand-rust"
              >
                register
              </button>
            </div>
          )}
        </nav>
        {userInfo && (
          <div className="block border-t border-brand-sand/40">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-brand-slate hover:text-brand-rust rounded-xl transition-colors"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Log Out Account</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
