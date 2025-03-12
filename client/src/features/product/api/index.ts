import { AxiosProgressEvent } from "axios";

import PATH from "@/constants/path";
import { HTTP } from "@/lib/http";
import {
  EmptyObject,
  Product,
  ProductGroup,
  TGetAllResponse,
  User,
} from "@/types";
import { CrudApi } from "@/utils";

import { CreateProductData, SearchData } from "../schema";
import { ProductQuery } from "../types";

type ProductResponse<T = EmptyObject> = { product: Product & T };

type CreateProductOptions = {
  data: CreateProductData;
  onUploadProgress: (event: AxiosProgressEvent) => void;
};

type UpdateProductOptions = {
  id: string;
  data: Partial<CreateProductData>;
  onUploadProgress?: (event: AxiosProgressEvent) => void;
};

export type GetAllProductBase = {
  status: ProductGroup;
  name: string;
  priceInRials: number;
  productImage: string;
  slug: string;
  id: string;
  _count: { chapters: number };
};

export type GetAllProductResponse<T = EmptyObject> = TGetAllResponse<{
  products: (GetAllProductBase & T)[];
}>;

type GetProductsOptions = {
  query?: ProductQuery;
};

type UpdateRatingOptions = {
  rating: number;
  productId: string;
};

type ProductResponseChapter = {
  id: string;
  episode: number;
  translator?: {
    fullName: string;
  };
};

type AverageRating = {
  averageRating?: { rating: number };
};

type GetProductBySlugResponse = ProductResponse<
  {
    chapters: ProductResponseChapter[];
    category: ProductGroup;
    status: ProductGroup;
    tags: ProductGroup[];
  } & AverageRating
>;

export type GetProductByIdResponse = ProductResponse<{
  category: { id: string };
  status: { id: string };
  manager: { id: string };
  tags: { id: string }[];
}>;

type GetAllProductResponseCrudDetails = {
  manager: { fullName: string };
  category: ProductGroup;
  _count: { chapters: number };
};

export type CrudProduct = GetAllProductBase & GetAllProductResponseCrudDetails;

type GetAllProductResponseCrud =
  GetAllProductResponse<GetAllProductResponseCrudDetails>;

type UpdateProductRatingResponse = ProductResponse<AverageRating>;

export type ManagersResponse = {
  managers: User[];
};

function pathWithSlug(slug: string) {
  return `${PATH.base.product}/${slug}`;
}

class ProductApi extends CrudApi<
  GetAllProductResponseCrud,
  GetProductByIdResponse,
  CreateProductData,
  { id: string },
  ProductQuery
> {
  constructor() {
    super("product");
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

  getBySlug({ slug, query }: GetProductsOptions & { slug: string }) {
    return HTTP.get<GetProductBySlugResponse>(pathWithSlug(slug), {
      params: query,
    });
  }

  getManagers() {
    return HTTP.get<ManagersResponse>(PATH.user.getManagers);
  }

  getByCategory({
    category,
    query,
  }: GetProductsOptions & { category: string }) {
    return HTTP.get<GetAllProductResponse>(
      pathWithSlug(`category/${category}`),
      { params: query }
    );
  }

  getByTag({ tag, query }: GetProductsOptions & { tag: string }) {
    return HTTP.get<GetAllProductResponse>(pathWithSlug(`tag/${tag}`), {
      params: query,
    });
  }

  updateRating({ productId, rating }: UpdateRatingOptions) {
    return HTTP.put<UpdateProductRatingResponse>(
      pathWithSlug(`${productId}/update-rating`),
      {
        data: { rating },
      }
    );
  }

  getByName({ name, query }: SearchData & GetProductsOptions) {
    return HTTP.get<GetAllProductResponse>(PATH.base.product, {
      params: { name, ...query },
    });
  }
}

const productApi = new ProductApi();

export default productApi;
