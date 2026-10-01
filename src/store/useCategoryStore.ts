import { Category } from "@/types";
import { create } from "zustand";

interface categoryState {
    listCategory: Category[] 
    setListCategory: (categories: Category[]) => void;
}

export const useCategoryStore = create<categoryState>((set) => ({
    listCategory: [],
    setListCategory: (listCategory) => set(() => ({listCategory}))
}));