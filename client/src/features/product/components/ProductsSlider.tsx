import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { GetAllProductBase } from "../api";
import { ProductCard } from "./ProductCard";

type ProductsSliderProps = {
  products: GetAllProductBase[];
};

import "swiper/css";
import "swiper/css/pagination";

function ProductsSlider({ products }: ProductsSliderProps) {
  return (
    <Swiper
      modules={[Pagination]}
      grabCursor
      loop
      spaceBetween={17}
      className="w-full p-4 pb-0"
      wrapperTag="ul"
      wrapperClass="swiper-wrapper mb-12 grid grid-flow-col"
      pagination={{
        clickable: true,
        bulletClass:
          "swiper-pagination-bullet size-3 bg-slate-950 inline-block transition-all opacity-65",
        bulletActiveClass:
          "swiper-pagination-bullet-active !bg-primary-600 !opacity-100 w-8 rounded-full",
      }}
      // i try many break points then i realize
      // these are one of the best break points
      breakpoints={{
        560: {
          slidesPerView: 2,
        },
        900: {
          slidesPerView: 3,
        },
        1150: {
          slidesPerView: 4,
        },
        1440: {
          slidesPerView: 5,
        },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id} tag="li">
          <ProductCard product={product} cardProps={{ className: "h-full" }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ProductsSlider;
