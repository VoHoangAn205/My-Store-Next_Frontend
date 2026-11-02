import { useEffect, useRef, useState } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";

const CategorySelectionBar = () => {
  const { listCategory, setCategoryUpload } = useCategoryStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleToggleCategory = (catId: string) => {
    if (selectedCategories.includes(catId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const filteredCategories = listCategory.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCategoryUpload(selectedCategories);
  }, [selectedCategories]);
  return (
    <>
      <div ref={dropdownRef} className="relative">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
          Categories *
        </label>

        {/* Input Trigger Button Box */}
        <div
          onClick={() => setIsOpen(true)}
          className="w-full min-h-11 px-3 py-2 bg-brand-light border border-brand-sand/60 rounded-xl text-sm flex flex-wrap gap-1.5 items-center cursor-pointer focus-within:border-brand-rust transition-colors"
        >
          {selectedCategories.length === 0 ? (
            <span className="text-slate-400 pl-1">Select categories...</span>
          ) : (
            selectedCategories.map((catId) => {
              const matchedCat = listCategory.find((c) => c._id === catId);
              return (
                <span
                  key={catId}
                  className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-indigo-100 flex items-center gap-1.5 animate-fade-in select-none"
                >
                  {matchedCat?.name}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // Stops dropdown from opening/closing
                      handleToggleCategory(catId);
                    }}
                    className="hover:text-indigo-900 font-bold font-mono transition-colors"
                  >
                    ×
                  </button>
                </span>
              );
            })
          )}

          <div className="absolute right-4 top-8.75 text-slate-400 pointer-events-none">
            <i
              className={`fa-solid fa-chevron-up w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            ></i>
          </div>
        </div>
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-h-60 flex flex-col">
            {/* Realtime Search Bar Input Header */}
            <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs pl-2"></i>
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent py-1 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                autoFocus
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="text-xs text-slate-400 hover:text-slate-600 px-1 font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            {/* List Selection Node View */}
            <div className="overflow-y-auto div_ide-y div_ide-slate-50 flex-1">
              {filteredCategories.length === 0 ? (
                <div className="p-4 text-xs text-slate-400 text-center">
                  No matching categories found
                </div>
              ) : (
                filteredCategories.map((cat) => {
                  const isChecked = selectedCategories.includes(cat._id);
                  return (
                    <div
                      key={cat._id}
                      onClick={() => handleToggleCategory(cat._id)}
                      className={`px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors select-none ${
                        isChecked
                          ? "bg-indigo-50/50 font-medium text-indigo-700"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{cat.name}</span>

                      {/* Interactive Visual Checkbox */}
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                          isChecked
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && (
                          <i className="fa-solid fa-check text-[9px] font-black"></i>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategorySelectionBar;