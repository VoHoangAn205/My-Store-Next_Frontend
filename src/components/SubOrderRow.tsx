"use client"
import { SubOrder } from "@/types";
import Link from "next/link";
import { useState } from "react";

interface Props {
    subOrder: SubOrder;
}

// 1. DEDICATED COLLAPSABLE SUB-ORDER COMPONENT
function SubOrderRow({ subOrder }: Props) {
  const [isOpen, setIsOpen] = useState(false);  

  return (
    <div className="pt-0 p-4 space-y-4 border-b border-slate-100 last:border-b-0">
      {/* Clickable Header Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center bg-indigo-50/40 hover:bg-indigo-50/80 transition-colors px-4 py-3 rounded-xl border border-indigo-100/30 cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          {/* Animated Toggle Arrow */}
          <svg
            className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <span className="text-xs text-slate-600 font-medium">
            Shipment from Shop:{" "}
            <Link href="#">
              <span className="font-mono font-bold text-slate-700">
                {subOrder.shopId.username || ""}
              </span>
            </Link>
          </span>
          <span className="text-xs text-slate-400 font-normal">
            ({subOrder.orderItems?.length || 0}{" "}
            {subOrder.orderItems?.length === 1 ? "item" : "items"})
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-700 font-mono mr-2">
            ${(subOrder.subTotalPrice || 0).toLocaleString()}
          </span>
          <span
            className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 font-bold rounded-full font-mono ${
              subOrder.subStatus === "pending"
                ? "bg-amber-100 text-amber-800 border border-amber-200/60"
                : "bg-emerald-100 text-emerald-800 border border-emerald-200/60"
            }`}
          >
            {subOrder.subStatus}
          </span>
        </div>
      </div>

      {/* Collapsable Content Body Container */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-2"
            : "grid-rows-[0fr] opacity-0 overflow-hidden"
        }`}
      >
        <div className="overflow-hidden space-y-3 px-4">
          {subOrder.orderItems?.map((item) => (
            <div
              key={item.product}
              className="flex justify-between items-center text-sm py-2 border-b border-slate-50 last:border-0"
            >
              <div className="space-y-0.5">
                <p className="font-semibold text-slate-800 capitalize">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500">
                  Quantity:{" "}
                  <span className="font-semibold text-slate-700">
                    {item.quantity}
                  </span>
                  {" · "}
                  Unit Price: ${item.price.toLocaleString()}
                </p>
              </div>
              <div className="text-right font-medium text-slate-700 font-mono">
                ${(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubOrderRow;