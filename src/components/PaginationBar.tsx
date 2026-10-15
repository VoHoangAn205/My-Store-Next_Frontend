"use client"
import useUpdateQuery from "@/store/useUpdateQuery"
import { PagePagination } from "@/types"

interface PaginationBar {
    pagination: PagePagination
}

interface ButtonProps {
  label: string,
  disable: boolean,
  onClick: () => void
}

const NavigationButton = ({label, disable, onClick} : ButtonProps) => (
   <button
    onClick={onClick}
    disabled={disable}
    className="px-4 py-2 border border-brand-sand bg-white text-sm font-medium text-brand-dark rounded-lg hover:bg-brand-light disabled:opacity-40 disabled:cursor-not-allowed transition"
  >
    {label}
  </button>
)

const PaginationBar = ({pagination}: PaginationBar) => {
    const {currentPage, totalPage} = pagination
    const updateQuery = useUpdateQuery()

    const handleNavigation = (position: number) => {      
      updateQuery({page: position.toString()})
    }
    return (
        <>
        <div className="flex items-center justify-center gap-2 pt-6 border-t border-brand-sand">
                  {/* Previous Button */}
                  <NavigationButton label="Previous" 
                  disable={currentPage === 1}
                  onClick={() => handleNavigation(currentPage - 1)} />

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1 px-2">
                    {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                      (p) => (
                        <button
                          key={p}
                          onClick={() => handleNavigation(p)}
                          className={`w-9 h-9 text-sm font-semibold rounded-lg transition ${
                            p === currentPage
                              ? "bg-brand-rust text-white shadow-sm"
                              : "bg-white border border-brand-sand text-brand-dark hover:bg-brand-light"
                          }`}
                        >
                          {p}
                        </button>
                      ),
                    )}
                  </div>

                  {/* Next Button */}
                  <NavigationButton label="Next" 
                  disable={currentPage === totalPage}
                  onClick={() => handleNavigation(currentPage + 1)} />
                </div>
        </>
    )
}

export default PaginationBar