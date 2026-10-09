"use client";
import { useCategoryStore } from "@/store/useCategoryStore";
import CategoryCardLoading from "./loadingSkeleton/CategoryCardLoading";
import CategoryCard from "./CategoryCard";

const CategoryFilterBar = () => {
    const listCategory = useCategoryStore().listCategory;

    if(!listCategory || listCategory.length === 0) {
        return <CategoryCardLoading/>
    }
    return listCategory.slice(0,6).map((cate) => {
            return <CategoryCard data={cate} key={cate._id}/>;
        })
}

export default CategoryFilterBar; 