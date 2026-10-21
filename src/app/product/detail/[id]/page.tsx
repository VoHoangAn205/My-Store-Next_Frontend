import ActionSection from "@/components/detailPageComponent/ActionSection";
import ImageContainer from "@/components/detailPageComponent/ImageContainer";
import VendorInfo from "@/components/detailPageComponent/VendorInfo";
import renderStatusColor from "@/helpers/renderStatusColor";
import { ApiError } from "@/lib/ApiError";
import productService from "@/services/productService";
import { Product } from "@/types";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string}>
}

export const revalidate = 60;

const detail = async ({ params} : Props) => {
    const { id } = await params;
    let product: Product | null = null
    console.log("detail page here");
    
    try {
        const response = await productService.getProductDetail({id: id})

        product = response
    } catch (err) {
        if(err instanceof ApiError && err.status === 404) {
           notFound()
        }
        console.error("Get product's detail failed: ", err)
        throw err;
    }

    const {_id, category, createdAt, description, gallery, name, price, status, stock, user} = product
    return (
        <>
        <div className="min-h-screen bg-brand-light py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-brand-sand/40 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-10">
          {/* LEFT COLUMN: Gallery */}
            <ImageContainer data={gallery} productName={name}/>

          {/* RIGHT COLUMN: Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Seller / User Information Badge */}
                <VendorInfo data={user}/>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2">
                {name}
              </h1>

              {/* Status Badges */}
              <div className="flex items-center gap-3 mb-4 text-sm">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${renderStatusColor(
                    status,
                  )}`}
                >
                  {status}
                </span>

                <span className="text-xs text-brand-slate font-mono">
                  ID: {_id}
                </span>
              </div>

              {/* Price & Stock */}
              <div className="flex items-baseline gap-4 py-3 border-y border-brand-sand/60 mb-6">
                <span className="text-3xl font-extrabold text-brand-rust">
                  ${Number(price).toFixed(2)}
                </span>
                <span className="text-xs text-brand-slate">
                  Stock:{" "}
                  <strong className="text-brand-dark">
                    {stock} items left
                  </strong>
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-brand-dark mb-2">
                  Description
                </h3>
                <p className="text-brand-slate text-sm leading-relaxed whitespace-pre-line">
                  {description || "No description provided for this product."}
                </p>
              </div>
            </div>

            {/* Action Section */}
                <ActionSection data={{_id, price, stock}}/>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}

export default detail;