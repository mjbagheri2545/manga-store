import { Response } from "express";

import ControllerConfiguration from "@/controllers/configuration.controller";
import { EmptyObject, UserAuthorizedReq } from "@/types";

import DB from "../db";
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

class GetProductsController extends ControllerConfiguration {
  async getAll(req: ProductGetReq, res: Response) {
    const products = await DB.getAll(req.query);

    this.successfulResponse({ res, data: { products } });
  }

  async getByProductSlug(req: GetByProductSlugReq, res: Response) {
    const {
      params: { productSlug },
    } = req;

    const product = await DB.getByProductSlug(productSlug);

    if (product == null) {
      return this.notFound({
        res,
        entityName: "محصولی",
        entityInfo: "آدرس اینترنتی",
      });
    }

    this.successfulResponse({ res, data: { product } });
  }

  async getByCategory(req: ProductGetReq<{ category: string }>, res: Response) {
    const {
      query,
      params: { category },
    } = req;

    const products = await DB.getByCategory(category, query);

    this.successfulResponse({ res, data: { products } });
  }

  async getByTag(req: ProductGetReq<{ tag: string }>, res: Response) {
    const {
      query,
      params: { tag },
    } = req;

    const products = await DB.getByTag(tag, query);

    this.successfulResponse({ res, data: { products } });
  }

  async getByStatus(req: ProductGetReq<{ status: string }>, res: Response) {
    const {
      query,
      params: { status },
    } = req;

    const products = await DB.getByStatus(status, query);

    this.successfulResponse({ res, data: { products } });
  }
}

export default GetProductsController;
