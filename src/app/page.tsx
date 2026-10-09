import CategoryFilterBar from "@/components/CategoryFilterBar";
import LoadingCardSkeleton from "@/components/loadingSkeleton/LoadingCardSkeleton";
import productService from "@/services/productService";
import ProductCard from "../components/ProductCard";
import { Product } from "@/types";
import getErrorMessage from "@/helpers/getErrorMessage";

export const revalidate = 60;

const Home = async () => {
  let products: Product[] = []
  let errMessage: string | null = null;

  try {
    const response = await productService.getHomePageProduct({limit: 8})  
      products = response.data;
  } catch (err) {
    const message = getErrorMessage(err);
    errMessage = message 
    console.error(message)
  }
  
  return (
    <>
        <div className="min-h-screen bg-brand-light font-sans text-brand-dark py-12 space-y-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* SECTION 1: FEATURED CATEGORIES (Quick Hub) */}
            <section>
              {/* Section Header */}
              <div className="flex items-end justify-between mb-6 pb-3 border-b border-brand-sand">
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark tracking-tight">
                    Shop by Category
                  </h2>
                  <p className="text-sm text-brand-slate mt-1">
                    Browse our main collections
                  </p>
                </div>
              </div>

              {/* Category Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <CategoryFilterBar/>
              </div>
            </section>

            {/* SECTION 2: NEW ARRIVALS (Limit to 4 items) */}
            <section>
              {/* Section Header */}
              <div className="flex items-end justify-between mb-6 pb-3 border-b border-brand-sand">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-rust/10 text-brand-rust text-xs font-bold px-2 py-0.5 rounded">
                      NEW
                    </span>
                    <h2 className="text-2xl font-bold text-brand-dark tracking-tight">
                      New Arrivals
                    </h2>
                  </div>
                  <p className="text-sm text-brand-slate mt-1">
                    Just landed in our store this week
                  </p>
                </div>
              </div>

                {errMessage ? (
                  <p className="rounded-lg bg-red-50 p-4 text-red-600">
                    Unable to load posts. Please try again later.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.slice(0, 4).map((product) => (
                      <ProductCard data={product} key={product._id} />
                    ))}
                  </div>
                )}
                
            </section>

            {/* SECTION 3: MOST POPULAR */}
            <section>
              {/* Section Header */}
              <div className="flex items-end justify-between mb-6 pb-3 border-b border-brand-sand">
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark tracking-tight">
                    Most Popular
                  </h2>
                  <p className="text-sm text-brand-slate mt-1">
                    Most popular items chosen by our customers
                  </p>
                </div>
              </div>

                {errMessage ? (
                  <p className="rounded-lg bg-red-50 p-4 text-red-600">
                    Unable to load posts. Please try again later.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.slice(4).map((product) => (
                      <ProductCard data={product} key={product._id} />
                    ))}
                  </div>
                )}
              
            </section>
          </div>
        </div>
      
    </>
  );
}

export default Home;