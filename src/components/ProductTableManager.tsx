import getErrorMessage from "@/helpers/getErrorMessage";
import productService from "@/services/productService";
import { Product } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import renderStatusColor from "../helpers/renderStatusColor";

interface Props {
    products: Product[]
}

const ProductTableManager = ({ products } : Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProduct = async (id: string) => {
    if(isDeleting) return;
    const toastId = toast.loading("Deleting product...");
    setIsDeleting(true);
    try {
      await productService.deleteProduct(id);

      toast.success("Product deleted successful");
    } catch (err) {
      const message = getErrorMessage(err);
      console.error(message);
      toast.error(message)
    } finally {
      toast.dismiss(toastId);
      setIsDeleting(false);
    }
  };
  return (
    <>
      {/* ==================== 1. TABLE LAYOUT (MD DESKTOP & IPAD) ==================== */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[11px] font-mono uppercase tracking-wider">
              <th className="px-6 py-4">Product Title</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Updated At</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-slate-50/50 transition-colors text-sm"
              >
                {/* Product Title */}
                <td className="px-6 py-4 font-semibold text-slate-800 capitalize max-w-60 truncate">
                  {product.name}
                </td>
                {/* Price */}
                <td className="px-6 py-4 font-mono font-medium text-slate-700">
                  ${(product.price || 0).toLocaleString()}
                </td>
                {/* Status Pill */}
                <td className="px-6 py-4">
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${renderStatusColor(
                      product.status,
                    )}`}
                  >
                    {product.status}
                  </span>
                </td>
                {/* Stock Value */}
                <td className="px-6 py-4 text-slate-600 font-mono">
                  {product.stock ?? 0} units
                </td>
                {/* Update Time */}
                <td className="px-6 py-4 text-xs text-slate-400">
                  {new Date(product.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      disabled={isDeleting}
                      onClick={() => handleDeleteProduct(product._id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ==================== 2. MOBILE CARD LAYOUT (IPHONE / ANDROID) ==================== */}
      <div className="block md:hidden divide-y divide-slate-100">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 space-y-3 hover:bg-slate-50/30 transition-colors"
          >
            <div className="flex justify-between items-start gap-2">
              {/* Title & Price stacked */}
              <div>
                <h4 className="font-semibold text-slate-800 capitalize text-sm">
                  {product.name}
                </h4>
                <p className="text-xs font-mono font-bold text-indigo-600 mt-0.5">
                  ${(product.price || 0).toLocaleString()}
                </p>
              </div>
              {/* Action row at mobile right */}
              <div className="flex items-center gap-1 shrink-0">
                <button className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="p-2 text-slate-400 hover:text-rose-600 rounded-lg">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>

            {/* Sub-details block rows */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-50 text-xs">
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">
                  Status
                </p>
                <span
                  className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold mt-0.5 ${renderStatusColor(
                    product.status,
                  )}`}
                >
                  {product.status}
                </span>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">
                  Stock Available
                </p>
                <p className="text-slate-700 font-mono font-medium mt-0.5">
                  {product.stock ?? 0} units
                </p>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 pt-1">
              <i className="fa-regular fa-clock"></i>
              <span>
                Updated:{" "}
                {new Date(product.updatedAt).toLocaleString("en-US", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ProductTableManager;