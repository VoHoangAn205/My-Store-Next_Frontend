import { axiosPublic } from "@/lib/API"
import { Category } from "@/types"

const categoryService = {
    getAllCategory: async () => {
        const response = await axiosPublic.get<Category[]>("/category");
        return response.data
    }
}

export default categoryService