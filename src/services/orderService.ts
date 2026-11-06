import { axiosPrivate } from "@/lib/API";
import { OrderPagination, ParentOrder, QueryParams } from "@/types";

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
    },
    getVendorOrder: async (data: QueryParams) => {
        const {limit, page, status} = data
        const response = await axiosPrivate.get<OrderPagination>(`/order/getShopOrders?status=${status}&limit=${limit}&page=${page}`)

        return response.data;
    },
    vendorUpdateOrderStatus: async (id: string) => {
        const response = await axiosPrivate.put(`/order/shopUpdateStatus/${id}`);

        return response.data;
    },
    vendorCancelOrder: async (id: string) => {
        const response = await axiosPrivate.put(`/order/shopCancel/${id}`);

        return response.data;
    }
}

export default orderService;