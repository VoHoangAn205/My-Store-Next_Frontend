'use client';
import categoryService from "@/services/categoryService";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useUIStore } from "@/store/useUIStore";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import HiddenSearchBar from "./HiddenSearchBar";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter()
  const { isSidebarOpen, toggleSidebar, closeSidebar} = useUIStore()
  const { listCategory, setListCategory} = useCategoryStore()
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navigateUser = (id: string) => {
    router.push(`/category/${id}`);
    closeSidebar()
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeSidebar()
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
      const getAllCategories = async () => {
        try {
          const response = await categoryService.getAllCategory();

            setListCategory(response)
        } catch (err) {
          toast.error("Failed to load categories");
        }
      }

      getAllCategories()
  }, []);
  return (
    <>
      <header className="bg-brand-dark p-5 border-b border-brand-sand/20 sticky z-50 top-0 shadow-md">
        <div className="mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6 items-baseline">
            <button className="md:hidden" onClick={() => toggleSidebar()}>
              <i className="fa-solid fa-bars text-brand-light text-[27px]"></i>
            </button>

            <Link href={"/"} className="text-xl font-black tracking-widest text-brand-light hover:text-brand-rust transition-colors duration-200">HOANGAN<span className="text-brand-rust">.</span></Link>
            {/* <a
              onClick={() => {
                navigate("/");
              }}
              className="text-xl font-black tracking-widest text-brand-light hover:text-brand-rust transition-colors duration-200"
            >
              HOANGAN<span className="text-brand-rust">.</span>
            </a> */}
          </div>

          <SearchBar />

          {/* dropdown menu */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <button
              onClick={() => toggleSidebar()}
              className="flex items-center gap-2 text-sm font-semibold text-brand-light hover:text-brand-rust transition-colors duration-200 focus:outline-none cursor-pointer"
            >
              <span>Categories</span>
              <i
                className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${isSidebarOpen ? "rotate-180" : ""}`}
              ></i>
            </button>

            {/* THE ACTUAL DROPDOWN FLOATING CARD */}
            {isSidebarOpen && (
              <div className="absolute -right-1/3 mt-4 w-50 bg-brand-dark border border-brand-sand/20 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {listCategory.map((cate, idx) => (
                  <a
                    key={idx}
                    className="flex items-center px-4 py-2.5 text-sm font-medium text-brand-slate hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => navigateUser(cate._id)} // Close menu when an option is clicked
                  >
                    {cate.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      <HiddenSearchBar />
    </>
  );
}

export default Header;
