import { axiosPrivate, axiosPublic } from "@/lib/API"
import { FormProductData, Product, ProductPagination, QueryParams, QueryParamsExtension } from "@/types"
import { unstable_cache } from "next/cache";

const productService = {
    getHomePageProduct: unstable_cache(async (data: QueryParams) => {
        const response = await axiosPublic.get<ProductPagination>(`/product?limit=${data.limit}`);
        
        return response.data; 
    }),
    getProductByCategory: unstable_cache(async (data: QueryParamsExtension) => {        
        const { id, sort, limit, page} = data;
        const response = await axiosPublic.get<ProductPagination>(`/product/category/${id}?page=${page}&limit=${limit}&sort=${sort}`);

        return response.data;
    }),
    searchProduct: async (data: QueryParamsExtension) => {
        const { query, sort, limit, page} = data
        
        const response = await axiosPublic.get<ProductPagination>(`/product/search?query=${query}&limit=${limit}&page=${page}&sort=${sort}`);

        return response.data;
    },
    getProductDetail: unstable_cache(async (data: QueryParamsExtension)=> {
        const response = await axiosPublic.get<Product>(`/product/${data.id}`);

        return response.data;
    }),
    getAllUserProducts: async (data: QueryParamsExtension) => {
        const { sort, limit, page} = data;

        const response = await axiosPrivate.get<ProductPagination>(`/product/myOwnProducts?page=${page}&limit=${limit}&sort=${sort}`);

        return response.data;
    },
    deleteProduct: async (id : string) => {
        const response = await axiosPrivate.delete(`/product/${id}`);

        return response.data;
    },
    createProduct: async (data: FormProductData) => {
        const response = await axiosPrivate.post(`/product`, data);

        return response.data;
    }
}

export default productService;