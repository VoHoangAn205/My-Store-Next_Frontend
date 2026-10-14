import { ProductPagination } from "@/types";
import { create } from "zustand";

interface ProductState {
    productByCategory: ProductPagination | null;
    setProductByCategory: (data: ProductPagination) => void;
}

export const useProductStore = create<ProductState>((set) => ({
    productByCategory: null,
    setProductByCategory: (productByCategory) => set(() => ({productByCategory}))
}))