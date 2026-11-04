import { axiosPrivate } from "@/lib/API";
import { ParentOrder } from "@/types";

export interface CartItemInput {
    productId: string,
    quantity: number,
    price?: number,
}

interface orderItems {
    cartItems: CartItemInput[]
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