import { Request, Response } from "express";

import { Product } from "@prisma/client";

import {
  EmptyObject,
  PaginateQueryWithSort,
  Req,
  UserAuthorizedReq,
} from "@/types";
import { notFound, successfulResponse } from "@/utils";

import productService from "../services";

type GetProductReq = Req<{ product: Product }>;

type GetAllProductReq<P = EmptyObject> = UserAuthorizedReq<
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
  async getAllProductGroups(_req: Request, res: Response) {
    const [categories, tags, productStatuses] =
      await productService.getProductGroups();

    successfulResponse({ res, data: { categories, tags, productStatuses } });
  }

  getProduct(req: GetProductReq, res: Response) {
    const { product } = req.body;

    successfulResponse({ res, data: { product } });
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
    req: GetAllProductReq<{ category: string }>,
    res: Response
  ) {
    const {
      query,
      params: { category },
    } = req;

    const [products, count] = await productService.getByCategory(
      category,
      query
    );

    successfulResponse({ res, data: { products, count } });
  }

  async getProductsByTag(
    req: GetAllProductReq<{ tag: string }>,
    res: Response
  ) {
    const {
      query,
      params: { tag },
    } = req;

    const [products, count] = await productService.getByTag(tag, query);

    successfulResponse({ res, data: { products, count } });
  }
}

export default GetProductController;
