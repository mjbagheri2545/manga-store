import { Response } from "express";

import { EmptyObject, PaginateQueryWithSort, UserAuthorizedReq } from "@/types";
import { notFound, successfulResponse } from "@/utils";

import productService from "../services";

type ProductGetReq<P = EmptyObject> = UserAuthorizedReq<
  EmptyObject,
  PaginateQueryWithSort,
  P
>;

type GetBySlugReq = UserAuthorizedReq<
  EmptyObject,
  EmptyObject,
  { slug: string }
>;

class GetProductController {
  async getAllProducts(req: ProductGetReq, res: Response) {
    const [products, count] = await Promise.all([
      productService.getAll(req.query),
      productService.count(),
    ]);

    successfulResponse({ res, data: { products, count } });
  }

  async getProductBySlug(req: GetBySlugReq, res: Response) {
    const {
      params: { slug },
    } = req;

    const product = await productService.getBySlug(slug);

    if (product == null) {
      return notFound({
        res,
        entityName: "محصولی",
        entityInfo: "آدرس اینترنتی",
      });
    }

    successfulResponse({ res, data: { product } });
  }

  async getProductsByCategory(
    req: ProductGetReq<{ category: string }>,
    res: Response
  ) {
    const {
      query,
      params: { category },
    } = req;

    const [products, count] = await Promise.all([
      productService.getByCategory(category, query),
      productService.count(),
    ]);

    successfulResponse({ res, data: { products, count } });
  }

  async getProductsByTag(req: ProductGetReq<{ tag: string }>, res: Response) {
    const {
      query,
      params: { tag },
    } = req;

    const [products, count] = await Promise.all([
      productService.getByTag(tag, query),
      productService.count(),
    ]);

    successfulResponse({ res, data: { products, count } });
  }

  async getProductsByStatus(
    req: ProductGetReq<{ status: string }>,
    res: Response
  ) {
    const {
      query,
      params: { status },
    } = req;

    const [products, count] = await Promise.all([
      productService.getByStatus(status, query),
      productService.count(),
    ]);

    successfulResponse({ res, data: { products, count } });
  }
}

export default GetProductController;
