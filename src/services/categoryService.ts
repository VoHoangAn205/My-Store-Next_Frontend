import { axiosPublic } from "@/lib/API";
import { Category } from "@/types";
import { unstable_cache } from "next/cache";

const categoryService = {
    getAllCategory: unstable_cache( async () => {
        const response = await axiosPublic.get<Category[]>("/category");
        return response.data;
    }),
}

export default categoryService