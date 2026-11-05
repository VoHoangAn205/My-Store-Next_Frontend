import { axiosPrivate } from "@/lib/API";
import { Cart, CartInput } from "@/types";

const cartService = {
    addToCart: async (data: CartInput) => {
        const response = await axiosPrivate.put<Cart>(`/cart`, data);

        return response.data;
    },
    getAllCart: async () => {
        const response = await axiosPrivate.get<Cart>(`/cart`);

        return response.data;
    },
    deleteCart: async (id: string) => {
        const response = await axiosPrivate.delete<Cart>(`/cart/${id}`);

        return response.data;
    }
}

export default cartService;