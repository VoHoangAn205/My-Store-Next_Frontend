import { axiosPrivate, axiosPublic } from "@/lib/API";

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
}

export default orderService;