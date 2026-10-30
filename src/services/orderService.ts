import { axiosPrivate } from "@/lib/API";
import { ParentOrder } from "@/types";

interface cartItems {
    productId: string,
    quantity: number,
}

interface orderItems {
    cartItems: cartItems[]
}

const orderService = {
    createOrder: async (data: orderItems) => {
        const response = await axiosPrivate.post(`/order`, data);

        return response.data;
    },
    getMyOrder: async () => {
        const response = await axiosPrivate.get<ParentOrder[]>(`/order/getAllParents`);

        return response.data;
    }
}

export default orderService;