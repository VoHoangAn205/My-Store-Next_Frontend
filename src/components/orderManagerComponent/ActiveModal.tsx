"use client"
import { getNextStatusConfig } from "@/helpers/getNextStatusConfig";
import getOrderStatusStyle from "@/helpers/getOrderStatusStyle";
import { SubOrder } from "@/types";

interface Props {
    orderData: SubOrder;
    setActiveOrderModal: (data: SubOrder | null) => void;
    handleCancelOrder: (id: string) => void;
    handleStatusChange: (id: string) => void;

}

const ActiveModal = ({orderData, handleCancelOrder, handleStatusChange, setActiveOrderModal} : Props) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                type="button"
                onClick={() => setActiveOrderModal(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-slate-700 text-lg font-bold p-1 rounded-lg transition"
                >
                ✕
                </button>

                {/* Modal Header */}
                <div className="border-b border-slate-100 pb-3 mb-4 pr-6">
                <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 font-mono">
                    #{orderData._id}
                    </h2>
                    <span
                    className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border capitalize ${getOrderStatusStyle(
                        orderData.subStatus,
                    )}`}
                    >
                    {orderData.subStatus}
                    </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                    Placed on{" "}
                    {new Date(orderData.createdAt).toLocaleString()}
                </p>
                </div>

                {/* Meta Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200/80 mb-5 text-xs">
                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Customer Information
                    </h3>
                    <p className="font-semibold text-slate-900">
                    {orderData.user?.username}
                    </p>
                    <p className="text-slate-400 mt-1 font-mono text-[10px]">
                    User ID: {orderData.user?._id}
                    </p>
                </div>
                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Parent Reference
                    </h3>
                    <p className="text-slate-700 font-mono text-[11px]">
                    ID: #{orderData.parentOrder}
                    </p>
                </div>
                </div>

                {/* Items List */}
                <div className="mb-5">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 sm:mb-3">
                    Order Items ({orderData.orderItems?.length})
                </h3>
                <div className="space-y-2">
                    {orderData.orderItems?.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-center justify-between p-2.5 sm:p-3 border border-slate-100 rounded-xl bg-white"
                    >
                        <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 text-sm sm:text-base">
                            🛍️
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-semibold text-slate-900 capitalize">
                            {item.name}
                            </p>
                            <p className="text-[11px] text-slate-500">
                            ${item.price?.toLocaleString()} × {item.quantity}
                            </p>
                        </div>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                        ${(item.price * item.quantity).toLocaleString()}
                        </span>
                    </div>
                    ))}
                </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div>
                    <span className="text-[10px] sm:text-xs text-slate-500 block">
                    Sub-Order Total
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                    ${orderData.subTotalPrice?.toLocaleString()}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    {["pending", "processing"].includes(
                    orderData.subStatus?.toLowerCase(),
                    ) && (
                    <button
                        type="button"
                        onClick={() => handleCancelOrder(orderData._id)}
                        className="px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition text-center"
                    >
                        Cancel Order
                    </button>
                    )}

                    {(() => {
                    const nextConfig = getNextStatusConfig(
                        orderData.subStatus,
                    );

                    if (nextConfig) {
                        return (
                        <button
                            type="button"
                            onClick={() =>
                            handleStatusChange(orderData._id)
                            }
                            className={`px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5 ${nextConfig.buttonStyle}`}
                        >
                            <span>{nextConfig.label}</span>
                            <span>→</span>
                        </button>
                        );
                    }

                    const status = orderData.subStatus?.toLowerCase();

                    if (status === "shipped") {
                        return (
                        <div className="px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 text-center flex items-center justify-center gap-1.5">
                            <span>🚚 Awaiting Buyer Confirmation</span>
                        </div>
                        );
                    }

                    if (status === "delivered") {
                        return (
                        <div className="px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 text-center">
                            Order Delivered ✅
                        </div>
                        );
                    }

                    return (
                        <div className="px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-500 text-center">
                        Order Cancelled ❌
                        </div>
                    );
                    })()}
                </div>
                </div>
            </div>
        </div>
    )
}

export default ActiveModal;