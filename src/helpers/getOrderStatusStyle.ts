const getOrderStatusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "processing":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "shipped":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "delivered":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "cancelled":
      return "bg-rose-100 text-rose-800 border-rose-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
export default getOrderStatusStyle;