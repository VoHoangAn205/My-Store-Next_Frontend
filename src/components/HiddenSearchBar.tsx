import { useState } from "react";
import { useNavigate } from "react-router";

export default function HiddenSearchBar() {
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
      <div className="w-full max-w-md md:hidden">
        <form
          action={handleEnter}
          method="GET"
          className="relative flex items-center group"
        >
          <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-brand-slate group-focus-within:text-brand-rust transition-colors duration-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
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
            className="w-full pl-12 pr-4 py-3 bg-white text-brand-dark placeholder-brand-slate/60 rounded-xl border border-brand-sand shadow-sm focus:outline-none focus:border-brand-rust focus:ring-4 focus:ring-brand-rust/10"
          />
        </form>
      </div>
    </>
  );
}
