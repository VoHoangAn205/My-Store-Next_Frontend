import CategoryFilterBar from "@/components/CategoryFilterBar";
import CategoryPageHeader from "@/components/CategoryPageHeader";
import NoProductFound from "@/components/NoProductFound";
import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import getErrorMessage from "@/helpers/getErrorMessage";
import productService from "@/services/productService";
import { PagePagination, Product, ProductPagination } from "@/types";
const defaultPagination = {
  totalPage: 1,
  currentPage: 1,
  count: 0
}

interface Props {
  params: Promise<{ id: string}>
  searchParams : Promise<{
    sort?: "priceAsc" | "priceDesc" | "bestSeller",
    page?: string,
    limit?: string,
    q?: string
  }>
}

const category = async ({params, searchParams } : Props) => {
  const {id} = await params;
  const {page, limit, sort} = await searchParams;
  let products: Product[] = [];
  let pagination: PagePagination = defaultPagination;
  let errMessage: string | null = null;

  try {
    const response = await productService.getProductByCategory({ id, page, limit, sort }) 
    
    products = response.data;
    pagination = {
      totalPage: response.totalPage,
      currentPage: response.currentPage,
      count: response.count,
    };
      
  } catch (err) {
    const message = getErrorMessage(err);
    errMessage = message 
    console.error(message)
  }

  return (
    <>
      <div className="min-h-screen bg-brand-light font-sans text-brand-dark">
        {/* PAGE HEADER & BREADCRUMBS */}
          <CategoryPageHeader/>
        {/* MAIN CATEGORY CONTAINER */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* FULL-WIDTH SORT & CONTROL BAR */}
          {pagination && <CategoryFilterBar pagination={pagination}/>}

          {products.length === 0 ? (
            <NoProductFound />
          ) : (
            <>
              {/* PRODUCT GRID (Full Width 4-Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                {products.map((item) => {
                  return <ProductCard data={item} key={item._id} />;
                })}
              </div>

              {/* TRADITIONAL PAGINATION */}
              {pagination.totalPage > 1 && (
                <PaginationBar pagination={pagination}/>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default category;