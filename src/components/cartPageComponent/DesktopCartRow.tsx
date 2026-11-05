"use client"
import React from "react";
import renderStatusColor from "@/helpers/renderStatusColor";
import { CartItems, CartInput } from "@/types";
import { CartItemInput } from "@/services/orderService";

interface DesktopCartRowProps {
  item: CartItems;
  selectedIds: Set<string>;
  handleToggleSelectItem: (item: CartItemInput, isSelected: boolean) => void;
  handleQuantityChange: (data: CartInput) => void;
  handleRemoveItem: (id: string) => void;
}

const DesktopCartRow = React.memo(({
  item,
  selectedIds,
  handleToggleSelectItem,
  handleQuantityChange,
  handleRemoveItem,
}: DesktopCartRowProps) => {
    const product = item.product;
    const itemTotal = product.price * item.quantity;
    const isAvailable = product.status === "Available";
    const isChecked = selectedIds.has(product._id);
    const thumbnail = product.gallery.images[0]?.url

  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="p-4 text-center">
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
        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        />
    </td>

    {/* Product Info */}
    <td className="p-4">
        <div className="flex items-center space-x-3">
        <img
            src={thumbnail || "/placeholder.png"}
            alt={product.name || "Product"}
            className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50"
        />
        <div>
            <p className="font-semibold text-slate-800 text-sm line-clamp-1">
            {product.name || "Unknown Product"}
            </p>
            <span
            className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-md mt-1 ${renderStatusColor(
                product.status,
            )}`}
            >
            {product.status}
            </span>
        </div>
        </div>
    </td>

    {/* Price */}
    <td className="p-4 text-sm font-medium text-slate-600">
        ${product.price?.toFixed(2) || "0.00"}
    </td>

    {/* Quantity Controls */}
    <td className="p-4">
        <div className="flex items-center justify-center space-x-2">
        <button
            onClick={() =>
            handleQuantityChange({
                product: product._id,
                quantity: -1,
            })
            }
            disabled={item.quantity <= 1}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
            <i className="fa-solid fa-minus text-xs text-slate-600"></i>
        </button>
        <span className="w-8 text-center text-sm font-semibold text-slate-800">
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
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
            <i className="fa-solid fa-plus text-xs text-slate-600"></i>
        </button>
        </div>
    </td>

    {/* Total */}
    <td className="p-4 text-right text-sm font-semibold text-slate-800">
        ${itemTotal.toFixed(2)}
    </td>

    {/* Delete Action */}
    <td className="p-4 text-center">
        <button
        onClick={() => handleRemoveItem(product._id)}
        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        title="Remove item"
        >
        <i className="fa-regular fa-trash-can text-sm"></i>
        </button>
    </td>
    </tr>
  );
});

DesktopCartRow.displayName = "DesktopCartRow";
export default DesktopCartRow;