import { SectionTitle } from "@/components/ui/layout";
import LinkWithArrow from "@/components/ui/LinkWithArrow";
import PATH from "@/constants/path";
import productApi from "@/features/product/api";
import ProductsSliderSection from "@/features/product/components/ProductsSliderSection";
import { PRODUCTS_QUERY_TAKE } from "@/features/product/constants/global";

function LandingPage() {
  return (
    <>
      <ProductsSliderSection
        getAllProducts={() =>
          productApi.getAll({
            skip: 0,
            take: PRODUCTS_QUERY_TAKE,
            sort: "high-rated",
          })
        }
      >
        <SectionTitle title="برترین محصولات">
          <LinkWithArrow
            to={{
              pathname: PATH.base.product,
              search: "sort=high-rated",
            }}
          >
            همه
          </LinkWithArrow>
        </SectionTitle>
      </ProductsSliderSection>
      <ProductsSliderSection
        getAllProducts={() =>
          productApi.getAll({
            skip: 0,
            take: PRODUCTS_QUERY_TAKE,
            sort: "most-views",
          })
        }
      >
        <SectionTitle title="پر بازدید ترین محصولات">
          <LinkWithArrow
            to={{
              pathname: PATH.base.product,
              search: "sort=most-views",
            }}
          >
            همه
          </LinkWithArrow>
        </SectionTitle>
      </ProductsSliderSection>
      <ProductsSliderSection
        getAllProducts={() =>
          productApi.getAll({
            skip: 0,
            take: PRODUCTS_QUERY_TAKE,
            sort: "newest",
          })
        }
      >
        <SectionTitle title="تازه ترین محصولات">
          <LinkWithArrow
            to={{
              pathname: PATH.base.product,
              search: "sort=newest",
            }}
          >
            همه
          </LinkWithArrow>
        </SectionTitle>
      </ProductsSliderSection>
    </>
  );
}

export default LandingPage;
