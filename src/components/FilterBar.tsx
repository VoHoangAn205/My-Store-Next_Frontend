"use client";
import useUpdateQuery from "@/store/useUpdateQuery";
import { PagePagination } from "@/types";
import { useSearchParams } from "next/navigation";

const limitOptions = ["1","12", "16", "24"].map((n) => ({label: n, value: n}));
const sortOptions = [
  { label: "Newest Arrival", value: "newest" },
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" },
];

const DEFAULT_LIMIT = "12";
const DEFAULT_SORT = "newest";

interface FilterBarProps { 
    pagination: PagePagination;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

const SelectField = ({ id, label, value, options, onChange }: SelectFieldProps) => (
   <div className="flex items-center gap-2">
    <label
      htmlFor="limit"
      className="text-sm font-medium text-brand-slate shrink-0"
    >
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-brand-light border border-brand-sand text-brand-dark text-sm rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-brand-rust transition"
    >
      {options.map((n) => {
        return (
          <option key={n.value} value={n.value}>
            {n.label}
          </option>
        );
      })}
    </select>
  </div>
)

const FilterBar = ({pagination} : FilterBarProps) => {
    const updateQuery = useUpdateQuery()
    const searchParams  = useSearchParams()

    const sort = searchParams.get("sort") ?? DEFAULT_SORT;
    const limit = searchParams.get("limit") ?? DEFAULT_LIMIT;


    const { currentPage, totalPage, count} = pagination || {}

    return (
        <>
        <div className="bg-white border border-brand-sand rounded-2xl p-4 mb-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Items Count & Status */}
            <div className="flex items-center gap-4 text-sm text-brand-slate">
              <span>
                Page <strong className="text-brand-dark">{currentPage}</strong>{" "}
                of <strong className="text-brand-dark">{totalPage}</strong>
              </span>
              <span className="text-brand-sand">|</span>
              <span>
                <strong className="text-brand-dark">{count}</strong> items total
              </span>
            </div>

            {/* Sorting Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sort By Dropdown */}
              <SelectField options={sortOptions}
              value={sort}
              label="Sort By:"
              id="sort"
              onChange={(value) => updateQuery({ sort: value})}/>

              {/* Limit / Items Per Page Selector */}
              <SelectField options={limitOptions} 
              value={limit} 
              label="Show:" 
              id="limit" 
              onChange={(value) => updateQuery({ limit: value })}/>
            </div>
          </div>
        </>
    )
}

export default FilterBar; 