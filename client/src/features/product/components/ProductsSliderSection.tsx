import { ApiComponent } from "@/components/ui/api";
import { Section, SectionProps } from "@/components/ui/layout";
import { useInView } from "@/hooks";
import { ApiMethod } from "@/types";

import { GetAllProductsResponse } from "../api";
import ProductsSlider from "./ProductsSlider";

type ProductsSliderSectionProps = SectionProps & {
  getAllProducts: ApiMethod<GetAllProductsResponse, void>;
};

function ProductsSliderSection({
  getAllProducts,
  children,
  ...restProps
}: ProductsSliderSectionProps) {
  const { inView, ref } = useInView();

  return (
    <Section
      {...restProps}
      containerProps={{ ref, ...restProps.containerProps }}
    >
      {inView && (
        <>
          {children}
          <ApiComponent apiMethod={getAllProducts}>
            {(data) => <ProductsSlider {...data} />}
          </ApiComponent>
        </>
      )}
    </Section>
  );
}

export default ProductsSliderSection;
