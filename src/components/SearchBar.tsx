import { useState } from "react";
import { useNavigate } from "react-router";

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleOnChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleEnter = () => {
    if (query.length > 0) {
      navigate(`/search?query=${query}`);
    }
  };
  return (
    <>
      <div className="w-full max-w-md hidden md:block">
        <form
          action={handleEnter}
          method="GET"
          className="relative flex items-center group"
        >
          <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-brand-slate group-focus-within:text-brand-rust transition-colors duration-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z"
              />
            </svg>
          </div>
          <input
            value={query}
            onChange={handleOnChange}
            type="text"
            placeholder="Search collection..."
            className="w-full pl-11 pr-12 py-2 bg-white/10 text-white placeholder-brand-slate/70 rounded-xl border border-white/10 text-sm transition-all duration-200 focus:outline-none focus:bg-white focus:text-brand-dark focus:border-brand-rust focus:ring-4 focus:ring-brand-rust/20"
          />
          <kbd className="absolute right-3 hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-brand-slate bg-white/5 border border-white/10 rounded">
            X
          </kbd>
        </form>
      </div>
    </>
  );
}
