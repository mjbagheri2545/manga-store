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

    const products = await DB.getByProductSlug(productSlug);

    this.successfulResponse({ res, data: { products } });
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
