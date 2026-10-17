import FilterBar from "@/components/FilterBar"
import NoProductFound from "@/components/NoProductFound"
import PaginationBar from "@/components/PaginationBar"
import ProductCard from "@/components/ProductCard"
import SubPageHeader from "@/components/SubPageHeader"
import getErrorMessage from "@/helpers/getErrorMessage"
import productService from "@/services/productService"
import { PagePagination, Product, QueryParams } from "@/types"

const defaultPagination = {
  totalPage: 1,
  currentPage: 1,
  count: 0
}

interface Props {
    searchParams: Promise<QueryParams>
}

const search = async ({searchParams}: Props) => {
    const { query, page, limit, sort } = await searchParams;
    let products: Product[] = []
    let pagination: PagePagination = defaultPagination;
    let errMessage: string | null = null;

    const pageTitle = {
      pageName: "search",
      title: `Search query: "${query}"`,
      description: "Explore top-grade product by searching!"
    }

    try {
        const response = await productService.searchProduct({query, page, limit, sort});
        
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
    return (<>
         <div className="min-h-screen bg-brand-light font-sans text-brand-dark">
        {/* PAGE HEADER & BREADCRUMBS */}
          <SubPageHeader data={pageTitle}/>
        {/* MAIN CATEGORY CONTAINER */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* FULL-WIDTH SORT & CONTROL BAR */}
          {pagination && <FilterBar pagination={pagination}/>}

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
    </>)
}

export default search;