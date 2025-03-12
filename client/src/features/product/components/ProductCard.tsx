import { Link } from "@/components/utility";
import Image from "@/components/utility/Image";
import PATH from "@/constants/path";

import { GetAllProductBase } from "../api";

export function ProductCard({ product }: { product: GetAllProductBase }) {
  const { name, _count, productImage, slug, status } = product;
  return (
    <Link
      to={PATH.product.singleProduct(slug)}
      className="card cursor-pointer border border-slate-50/25 bg-dark p-4 rounded-sm transition hover:translate-y-[-1px] hover:scale-[1.035] text-white hover:text-white"
    >
      <figure>
        <Image className="w-full" src={productImage} alt={name} />
      </figure>
      <div className="card-body p-0 mt-3">
        <h2
          className="card-title !text-base mb-2 line-clamp-1 text-left"
          dir="ltr"
        >
          {name}
        </h2>
        <div className="flex justify-between items-center">
          <span>{status.name}</span>
          <span> {_count.chapters} چپتر </span>
        </div>
      </div>
    </Link>
  );
}
