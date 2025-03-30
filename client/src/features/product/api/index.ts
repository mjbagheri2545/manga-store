import PATH from "@/constants/path";
import {
  GetAllTranslatorsResponse,
  ProductBySlug,
  RatingResponse,
} from "@/contexts/ProductContext";
import { HTTP } from "@/lib/http";
import {
  EmptyObject,
  PaginateQueryWithSort,
  Product,
  ProductGroup,
  TGetAllResponse,
  WithOnUploadProgress,
} from "@/types";
import { CrudApi } from "@/utils";

import { CreateProductData } from "../schemas";
import { ProductQuery } from "../types";

type CreateProductOptions = WithOnUploadProgress & {
  data: CreateProductData;
};

type UpdateProductOptions = WithOnUploadProgress & {
  id: string;
  data: Partial<CreateProductData>;
};

export type GetAllProductBase = Pick<
  Product,
  | "name"
  | "oneChapterPriceInToman"
  | "productImage"
  | "slug"
  | "id"
  | "summary"
  | "views"
  | "releaseYear"
> & {
  status: ProductGroup;
  chaptersCount: number;
};

export type GetAllProductsResponse<T = EmptyObject> = TGetAllResponse<{
  products: (GetAllProductBase & T)[];
}>;

type GetProductsOptions = {
  query?: ProductQuery;
};

type RateOptions = {
  ratingNumber: number;
  productId: string;
};

type GetProductBySlugResponse = {
  product: ProductBySlug;
};

export type GetProductByIdResponse = {
  product: Product & {
    category: { id: string };
    status: { id: string };
    manager: { id: string };
    tags: { id: string }[];
  };
};

type GetAllProductsResponseCrudDetails = {
  manager: { fullName: string };
  category: ProductGroup;
  chaptersCount: number;
};

export type CrudProduct = GetAllProductBase & GetAllProductsResponseCrudDetails;

type GetAllProductsResponseCrud =
  GetAllProductsResponse<GetAllProductsResponseCrudDetails>;

export type ManagersResponse = {
  managers: { id: string; fullName: string }[];
};

type GetRelatedProductsOptions = {
  slug: string;
  query?: PaginateQueryWithSort;
};

function pathWithSlug(slug: string) {
  return `${PATH.base.product}/${slug}`;
}

class ProductApi extends CrudApi<
  GetAllProductsResponseCrud,
  GetProductByIdResponse,
  CreateProductData,
  { id: string },
  ProductQuery
> {
  constructor() {
    super(PATH.base.product);
  }
  // Number.POSITIVE_INFINITY because maybe image file
  // is large and internet speed is low
  override create({ data, onUploadProgress }: CreateProductOptions) {
    return HTTP.post<{ id: string }>(PATH.base.product, {
      data,
      onUploadProgress,
      headers: { "Content-Type": "multipart/form-data" },
      timeout: Number.POSITIVE_INFINITY,
    });
  }

  override update({ id, data, onUploadProgress }: UpdateProductOptions) {
    return HTTP.put<{ id: string }>(`${PATH.base.product}/${id}`, {
      data,
      onUploadProgress,
      headers: { "Content-Type": "multipart/form-data" },
      timeout: Number.POSITIVE_INFINITY,
    });
  }

  override getById({ id }: { id: string }) {
    return HTTP.get<GetProductByIdResponse>(pathWithSlug(id));
  }

  getBySlug({ slug }: { slug: string }) {
    return HTTP.get<GetProductBySlugResponse>(pathWithSlug(`by-slug/${slug}`));
  }

  getManagers() {
    return HTTP.get<ManagersResponse>(PATH.user.getManagers);
  }

  getByCategory({
    category,
    query,
  }: GetProductsOptions & { category: string }) {
    return HTTP.get<GetAllProductsResponse>(
      pathWithSlug(`category/${category}`),
      { params: query }
    );
  }

  getByTag({ tag, query }: GetProductsOptions & { tag: string }) {
    return HTTP.get<GetAllProductsResponse>(pathWithSlug(`tag/${tag}`), {
      params: query,
    });
  }

  getRelatedProducts({ id }: { id: string }) {
    return HTTP.get<GetAllProductsResponse>(
      PATH.product.getRelatedProducts(id)
    );
  }

  getRelatedTranslators({ slug, query }: GetRelatedProductsOptions) {
    return HTTP.get<GetAllTranslatorsResponse>(
      PATH.product.getRelatedTranslators(slug),
      { params: query }
    );
  }

  rate({ productId, ratingNumber }: RateOptions) {
    return HTTP.put<RatingResponse>(pathWithSlug(`${productId}/rate`), {
      data: { ratingNumber },
    });
  }
}

const productApi = new ProductApi();

export default productApi;
