import { axiosPublic } from "@/lib/API"
import { Product, ProductPagination, QueryParams, QueryParamsExtension } from "@/types"
import { unstable_cache } from "next/cache";

const productService = {
    getHomePageProduct: unstable_cache(async (data: QueryParams) => {
        const response = await axiosPublic.get<ProductPagination>(`/product?limit=${data.limit}`);
        
        return response.data; 
    }),
    getProductByCategory: unstable_cache(async (data: QueryParamsExtension) => {        
        const response = await axiosPublic.get<ProductPagination>((`/product/category/${data.id}?page=${data.page}&limit=${data.limit}&sort=${data.sort}`));

        return response.data;
    }),
    searchProduct: unstable_cache(async (data: QueryParamsExtension) => {
        const { query, sort, limit, page} = data
        console.log(data);
        
        const response = await axiosPublic.get<ProductPagination>(`/product/search?query=${query}&limit=${limit}&page=${page}&sort=${sort}`);

        return response.data;
    })
}

export default productService;