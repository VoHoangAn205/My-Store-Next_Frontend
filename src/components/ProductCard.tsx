import { Product } from "@/types";
import getProductStatusColor from "@/helpers/getProductStatusColor";
import Link from "next/link";

const ProductCard = ({data}: {data: Product}) => {
  const { name, gallery, price, status, user, _id } = data;
  const mainImage = gallery?.images[0].url;

  return (
    <article className="relative w-full bg-white border border-brand-sand rounded-xl p-4 shadow-sm hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out flex flex-col justify-between group">
      <div>
        {/* Image Container with Zoom on Hover */}
        <div className="relative w-full h-48 bg-brand-light rounded-lg mb-4 overflow-hidden border border-brand-sand/60">
          <img
            src={mainImage}
            alt={name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
        {/* Status Badge */}
        <span
          className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-md mb-2 ${getProductStatusColor(status)}`}
        >
          {status}
        </span>

        {/* Title with Full-Card Clickable Overlay */}
        <h3 className="font-semibold text-brand-dark text-base line-clamp-2 mb-2 group-hover:text-brand-rust transition-colors duration-200">
          <Link href={`/detail/${_id}`}
            className="cursor-pointer after:absolute after:inset-0 focus:outline-none"
          >
            {name}
          </Link>
        </h3>
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-brand-sand/60 mt-4 flex items-center justify-between">
        <span className="text-lg font-bold text-brand-rust">${price}</span>

        {/* Syncs button background on card hover */}
        <button
          type="button"
          tabIndex={-1}
          className="relative z-10 pointer-events-none bg-brand-dark group-hover:bg-brand-rust text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </article>
  );
};

export default ProductCard;