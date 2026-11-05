import { OrderStatus } from "@/types";

export const getNextStatusConfig = (currentStatus: OrderStatus) => {
    switch (currentStatus?.toLowerCase()) {
      case "pending":
        return {
          nextStatus: "processing",
          label: "Start Processing Order",
          buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
        };
      case "processing":
        return {
          nextStatus: "shipped",
          label: "Ship Order",
          buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white",
        };
      default:
        return null;
    }
  };
