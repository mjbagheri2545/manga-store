import { Response } from "express";

import { EmptyObject, UserAuthorizedReq } from "@/types";
import { notFound, successfulResponse } from "@/utils";

import productService from "../services";
import { ProductQuery } from "../types";

type ProductGetReq<P = EmptyObject> = UserAuthorizedReq<
  EmptyObject,
  ProductQuery,
  P
>;

type GetByProductSlugReq = UserAuthorizedReq<
  EmptyObject,
  EmptyObject,
  { productSlug: string }
>;

class GetProductsController {
  async getAll(req: ProductGetReq, res: Response) {
    const products = await productService.getAll(req.query);

    successfulResponse({ res, data: { products } });
  }

  async getByProductSlug(req: GetByProductSlugReq, res: Response) {
    const {
      params: { productSlug },
    } = req;

    const product = await productService.getByProductSlug(productSlug);

    if (product == null) {
      return notFound({
        res,
        entityName: "محصولی",
        entityInfo: "آدرس اینترنتی",
      });
    }

    successfulResponse({ res, data: { product } });
  }

  async getByCategory(req: ProductGetReq<{ category: string }>, res: Response) {
    const {
      query,
      params: { category },
    } = req;

    const products = await productService.getByCategory(category, query);

    successfulResponse({ res, data: { products } });
  }

  async getByTag(req: ProductGetReq<{ tag: string }>, res: Response) {
    const {
      query,
      params: { tag },
    } = req;

    const products = await productService.getByTag(tag, query);

    successfulResponse({ res, data: { products } });
  }

  async getByStatus(req: ProductGetReq<{ status: string }>, res: Response) {
    const {
      query,
      params: { status },
    } = req;

    const products = await productService.getByStatus(status, query);

    successfulResponse({ res, data: { products } });
  }
}

export default GetProductsController;
