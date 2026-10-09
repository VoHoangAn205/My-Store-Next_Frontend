import { Category } from "@/types";
import Link from "next/link";

const CategoryCard = ({ data }: {data: Category}) => {
  const { emoji, name, _id } = data;

  return (
    <Link
      href={`/category/${_id}`}
      className="bg-white border border-brand-sand rounded-xl p-4 text-center hover:border-brand-rust hover:shadow-md transition group"
    >
      <div className="w-12 h-12 mx-auto mb-3 bg-brand-light rounded-full flex items-center justify-center text-brand-rust group-hover:scale-110 transition">
        {emoji}
      </div>
      <span className="text-sm font-bold text-brand-dark block">{name}</span>
    </Link>
  );
};
export default CategoryCard;