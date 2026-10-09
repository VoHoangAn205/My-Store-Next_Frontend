import { axiosPublic } from "@/lib/API"
import { Product, ProductPagination, QueryParams } from "@/types"
import { unstable_cache } from "next/cache";

const productService = {
    getHomePageProduct: unstable_cache(async (data: QueryParams) => {
        const response = await axiosPublic.get<ProductPagination>(`/product?limit=${data.limit}`);
        
        return response.data; 
    })
}

export default productService;