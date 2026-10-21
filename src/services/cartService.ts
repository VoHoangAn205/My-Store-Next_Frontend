import { axiosPrivate, axiosPublic } from "@/lib/API";

interface Cart {
    product: string,
    quantity?: number,
}

const cartService = {
    addToCart: async (data: Cart) => {
        const response = await axiosPrivate.put(`/cart`, data);

        return response.data;
    },
    getAllCart: async () => {
        const response = await axiosPrivate.get(`/cart`);

        return response.data;
    },
    deleteCart: async (id: string) => {
        const response = await axiosPrivate.put(`/cart/${id}`);

        return response.data;
    }
}

export default cartService;