import { Category } from "@/types";
import { create } from "zustand";

interface categoryState {
    listCategory: Category[];
    categoryUpload: string[];
    setListCategory: (categories: Category[]) => void;
    setCategoryUpload: (category: string[]) => void;
}

export const useCategoryStore = create<categoryState>((set) => ({
    listCategory: [],
    categoryUpload: [],
    setListCategory: (listCategory) => set(() => ({listCategory})),
    setCategoryUpload: (category) => set({categoryUpload: category})
}));