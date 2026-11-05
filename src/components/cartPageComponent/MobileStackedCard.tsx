"use client"
import renderStatusColor from "@/helpers/renderStatusColor"
import { CartItemInput } from "@/services/orderService"
import { CartInput, CartItems } from "@/types"
import React from "react"

interface Props {
    selectedIds: Set<string>
    item: CartItems
    handleToggleSelectItem: (item: CartItemInput, isSelected: boolean) => void;
    handleQuantityChange: (data: CartInput) => void;
    handleRemoveItem: (id: string) => void;

}

const MobileStackedCard = React.memo(({selectedIds, item, handleRemoveItem, handleQuantityChange, handleToggleSelectItem} : Props) => {
  const product = item.product;
  const itemTotal = product.price * item.quantity;
  const isAvailable = product.status === "Available";
  const isChecked = selectedIds.has(product._id);
  const thumbnail = product.gallery.images[0]?.url
return (
    <>
      <div
          key={item._id || product._id}
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3"
        >
          {/* Top Section: Checkbox, Thumbnail, Product Details & Remove Button */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center space-x-3">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={isChecked || false}
                onChange={(e) =>
                  handleToggleSelectItem(
                    {
                      productId: product._id,
                      price: product.price,
                      quantity: item.quantity,
                    },
                    e.target.checked,
                  )
                }
                disabled={!isAvailable}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              />
              <img
                src={thumbnail || "/placeholder.png"}
                alt={product.name || "Product"}
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
              />
              <div>
                <h4 className="font-semibold text-slate-800 text-sm line-clamp-1">
                  {product.name || "Unknown Product"}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  ${product.price?.toFixed(2) || "0.00"} each
                </p>
                {/* Uses your status badge color helper */}
                {product.status && (
                  <span
                    className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-md mt-1 ${renderStatusColor(
                      product.status,
                    )}`}
                  >
                    {product.status}
                  </span>
                )}
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemoveItem(product._id)}
              className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
              title="Remove item"
            >
              <i className="fa-regular fa-trash-can text-sm"></i>
            </button>
          </div>

          {/* Bottom Section: Quantity Counter & Item Total */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <div className="flex items-center space-x-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() =>
                  handleQuantityChange({
                    product: product._id,
                    quantity: -1,
                  })
                }
                disabled={item.quantity <= 1}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs"
              >
                <i className="fa-solid fa-minus text-xs text-slate-600"></i>
              </button>
              <span className="w-6 text-center text-xs font-bold text-slate-800">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  handleQuantityChange({
                    product: product._id,
                    quantity: 1,
                  })
                }
                disabled={!isAvailable}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs"
              >
                <i className="fa-solid fa-plus text-xs text-slate-600"></i>
              </button>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Total
              </span>
              <span className="text-sm font-bold text-slate-800">
                ${itemTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
    </>
)
})
MobileStackedCard.displayName = "MobileStackedCard"
export default MobileStackedCard;