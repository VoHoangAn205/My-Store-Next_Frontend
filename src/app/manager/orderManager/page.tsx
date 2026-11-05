"use client"
import React, { useState, useEffect, useMemo } from "react";
import getStatusBadgeStyle from "../../helpers/getStatusBadgeStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  getShopOrders,
  shopCancelOrder,
  shopUpdateOrderStatus,
} from "../../redux/orderSlice";
import { toast } from "sonner";
import { getNextStatusConfig } from "@/helpers/getNextStatusConfig";
import { OrderStatus, SubOrder } from "@/types";
import orderService from "@/services/orderService";
import getErrorMessage from "@/helpers/getErrorMessage";
import ActiveModal from "@/components/orderManagerComponent/ActiveModal";
import { useSearchParams } from "next/navigation";
import OrderPagination from "@/components/orderManagerComponent/OrderPagination";

const STATUS_OPTIONS = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const ShopOrderManager = () => {
  const dispatch = useDispatch();
  const listOrder = useSelector((state) => state.ORDER.shopOrders);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  // const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeOrderModal, setActiveOrderModal] = useState<SubOrder | null>(null);
  // Pagination State
  const [limit, setLimit] = useState("5");

  const {
    data = [],
    count = 0,
    totalPage = 1,
    currentPage = 1,
  } = listOrder || {};

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPage) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage))

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Status Change Handler
  const handleStatusChange = async (orderId) => {
    try {
      const res = await dispatch(shopUpdateOrderStatus(orderId)).unwrap();

      await dispatch(
        getShopOrders({
          limit,
          page,
          status: selectedTab,
        }),
      );

      if (activeOrderModal && activeOrderModal._id === orderId) {
        setActiveOrderModal((prev) => ({
          ...prev,
          subStatus: res?.subStatus,
        }));
      }

      toast.success("Status update successful");
    } catch (err) {
        const message = getErrorMessage(err);
        toast.error(message);
        console.error(message);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      const res = await dispatch(shopCancelOrder(orderId)).unwrap();

      await dispatch(
        getShopOrders({
          limit,
          page,
          status: selectedTab,
        }),
      );

      if (activeOrderModal && activeOrderModal._id === orderId) {
        setActiveOrderModal((prev) => ({
          ...prev,
          subStatus: res?.subStatus,
        }));
      }

      toast.success("Order cancelled");
    } catch (err) {
        const message = getErrorMessage(err);
        toast.error(message);
        console.error(message);
    }
  };

  // Filter Logic
  const filteredOrders = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return data.filter((order) => {
      const matchesTab =
        selectedTab === "all" || selectedTab === order.subStatus;
      const matchesSearch =
        order._id.toLowerCase().includes(term) ||
        order.user?.username.toLocaleLowerCase().includes(term)

      return matchesSearch && matchesTab;
    });
  }, [data, searchTerm]);

  // Reset to page 1 whenever filters or limit change
  useEffect(() => {
    setSearchParams({ page: "1" });
  }, [selectedTab, searchTerm, limit]);

  useEffect(() => {
    
    (async () => {
        try {
            const response = await orderService.getVendorOrder({
                limit,
                page: page.toString(),
                status: selectedTab,
            })
        } catch (err) {
            const message = getErrorMessage(err);
            toast.error(message);
            console.error(message);
        }
    })();
  }, [page, selectedTab, limit]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-3 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shop Order Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage incoming sub-orders and update delivery progress.
            </p>
          </div>
        </div>

        {/* CONTROLS BAR */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-sm space-y-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100">
            {["all", ...STATUS_OPTIONS].map((tab) => {
              const isActive = selectedTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl capitalize whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  <span>{tab}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Order ID, Username, or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 sm:py-2.5 pl-10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
            />
            <span className="absolute left-3 top-2 sm:top-2.5 text-slate-400 text-sm sm:text-base">
              🔍
            </span>
          </div>
        </div>

        {/* ORDERS LIST CONTAINER */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          {/* 1. DESKTOP / TABLET TABLE VIEW (Hidden on small screens) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-4">Sub-Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Sub-Total</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      onClick={() => setActiveOrderModal(order)}
                      className="hover:bg-slate-50/80 cursor-pointer transition duration-150"
                    >
                      <td className="py-4 px-4 font-mono font-bold text-slate-900 text-xs">
                        #{order._id.slice(-8)}
                        <span className="block text-[10px] text-slate-400 font-sans font-normal">
                          Parent: #{order.parentOrder?.slice(-8)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-900">
                          {order.user?.username || "Unknown"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {order.user?.email}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-600 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-xs font-medium text-slate-800 space-y-0.5">
                          {order.orderItems?.map((item, idx) => (
                            <div
                              key={item._id || idx}
                              className="truncate max-w-45"
                            >
                              • <span className="capitalize">{item.name}</span>{" "}
                              (x{item.quantity})
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                        ${order.subTotalPrice?.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-block text-xs font-bold py-1 px-3 rounded-full border capitalize ${getStatusBadgeStyle(
                            order.subStatus,
                          )}`}
                        >
                          {order.subStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-12 text-center text-slate-400 text-sm"
                    >
                      No matching orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 2. MOBILE CARD VIEW (Shown only on small screens) */}
          <div className="block sm:hidden divide-y divide-slate-100">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div
                  key={order._id}
                  onClick={() => setActiveOrderModal(order)}
                  className="p-4 space-y-3 active:bg-slate-50 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-slate-900 text-xs">
                      #{order._id.slice(-8)}
                    </span>
                    <span
                      className={`text-[10px] font-bold py-0.5 px-2.5 rounded-full border capitalize ${getStatusBadgeStyle(
                        order.subStatus,
                      )}`}
                    >
                      {order.subStatus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {order.user?.username}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {order.user?.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-slate-900 text-sm">
                        ${order.subTotalPrice?.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-lg text-xs text-slate-700 space-y-1 border border-slate-100">
                    {order.orderItems?.map((item, idx) => (
                      <div
                        key={item._id || idx}
                        className="flex justify-between items-center text-[11px]"
                      >
                        <span className="capitalize font-medium">
                          • {item.name}
                        </span>
                        <span className="text-slate-500">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                No matching orders found.
              </div>
            )}
          </div>

          {/* PAGINATION FOOTER */}
          <OrderPagination
          currentPage={currentPage}
          totalItems={count}
          totalPage={totalPage}
          limit={limit}
          setLimit={setLimit}
          handlePageChange={handlePageChange}/>
        </div>

        {/* ORDER DETAILS MODAL */}
        {activeOrderModal && (
          <ActiveModal 
          orderData={activeOrderModal} 
          handleCancelOrder={handleCancelOrder}
          handleStatusChange={handleStatusChange}
          setActiveOrderModal={setActiveOrderModal}/>
        )}
      </div>
    </div>
  );
};

export default ShopOrderManager;