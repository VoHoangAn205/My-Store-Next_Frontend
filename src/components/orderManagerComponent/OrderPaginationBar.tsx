"use client"

import { useSearchParams } from "next/navigation";

interface Props {
    currentPage: number;
    totalPage: number;
    totalItems: number;
    handlePageChange: (p: number) => void;
    setLimit: (update: Record<string, string>) => void;
}

interface PropButton {
    label: string;
    disabled: boolean;
    onClick: () => void;
}

const ShortenButton = ({label, disabled, onClick}: PropButton) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="hidden sm:block p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition text-xs font-bold"
    >
        {label}
    </button>
)
const MainButton = ({label, disabled, onClick}: PropButton) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition text-xs font-medium flex-1 sm:flex-none text-center"
    >
        {label}
    </button>
)

const OrderPaginationBar = ({currentPage, totalPage, totalItems, handlePageChange, setLimit} : Props) => {
  const params = useSearchParams();
  const page = Number(params.get("page")) || 1;
  const limit = Number(params.get("limit")) || 5;

  const startIndex = totalItems > 0 ? (page - 1) * limit + 1 : 0;
  const endIndex = Math.min(page * limit, totalItems);

    return (
        <div className="px-3 sm:px-4 py-3 bg-slate-50/60 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Range Text & Per-Page Selector */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4 text-xs text-slate-600">
              <span>
                Showing <strong>{totalItems > 0 ? startIndex + 1 : 0}</strong>-
                <strong>{endIndex}</strong> of <strong>{totalItems}</strong>
              </span>

              <div className="flex items-center gap-1.5">
                <label htmlFor="perPage" className="text-slate-500">
                  Per page:
                </label>
                <select
                  id="perPage"
                  value={limit}
                  onChange={(e) => setLimit({"limit": e.target.value})}
                  className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                >
                  <option value={"5"}>5</option>
                  <option value={"10"}>10</option>
                  <option value={"20"}>20</option>
                </select>
              </div>
            </div>
        <div className="flex items-center justify-center gap-1 w-full md:w-auto">
              {/* Desktop First Page */}
              <ShortenButton
              label="«"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(1)}/>
              

              {/* Prev */}
              <MainButton
              label="Prev"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}/>

              {/* Number Buttons (Hidden on mobile to save space) */}
              <div className="hidden sm:flex items-center gap-1 px-1">
                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                        currentPage === page
                          ? "bg-slate-900 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-200/60"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              {/* Mobile Page Indicator */}
              <span className="sm:hidden text-xs text-slate-500 px-2 font-medium">
                {currentPage} / {totalPage}
              </span>

              {/* Next */}
              <MainButton
              label="Next"
              disabled={currentPage === totalPage || totalItems === 0}
              onClick={() => handlePageChange(currentPage + 1)}/>

              {/* Desktop Last Page */}
              <ShortenButton
              label="»"
              disabled={currentPage === totalPage || totalItems === 0}
              onClick={() => handlePageChange(totalPage)}/>
            </div>
          </div>
    )
}

export default OrderPaginationBar;