import { Request, Response } from "express";

import { EmptyObject, PaginateQueryWithSort, UserAuthorizedReq } from "@/types";
import { notFound, successfulResponse } from "@/utils";
import { mapProductComments } from "@/utils/features/product_productComment.util";

import { ProductBase } from "../constants/global";
import productService from "../services";
import { calculateAverageProductRating } from "../utils";

type GetProductReq = UserAuthorizedReq<{
  product: ProductBase;
}>;

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

type GetRelatedTranslatorsReq = UserAuthorizedReq<
  EmptyObject,
  PaginateQueryWithSort,
  { id: string }
>;

type GetRelatedProductsReq = UserAuthorizedReq<{
  product: { categoryId: string; tags: { id: string }[] };
}>;

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
      body: { user },
    } = req;

    const [product, translators] = await productService.getBySlug(
      slug,
      user.id
    );

    if (product == null) {
      return notFound({
        res,
        entityName: "محصولی",
        entityInfo: "آدرس اینترنتی",
      });
    }

    const { _count, ratings, comments, ...restData } = product;

    const ratingsCount = _count.ratings;
    const averageRating = calculateAverageProductRating(ratings, ratingsCount);

    const viewerRating = ratings.find((rating) => rating.ratedById === user.id);
    const finalTranslators = translators.map(
      ({ _count, ...restTranslatorData }) => ({
        ...restTranslatorData,
        translatedChaptersCount: _count.translatedChapters,
      })
    );

    const finalProduct = {
      ...restData,
      chaptersCount: _count.chapters,
      views: _count.views,
      translators: finalTranslators,
      comments: mapProductComments(comments, user),
      rating: {
        averageRating,
        ratingsCount,
        myRating: viewerRating?.rating,
      },
    };

    successfulResponse({
      res,
      data: { product: finalProduct },
    });
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

  async getRelatedProducts(req: GetRelatedProductsReq, res: Response) {
    const { product } = req.body;

    const relatedProducts = await productService.getRelatedProducts(
      product.categoryId,
      product.tags.map((tag) => tag.id)
    );

    successfulResponse({ res, data: { products: relatedProducts } });
  }

  async getRelatedTranslators(req: GetRelatedTranslatorsReq, res: Response) {
    const {
      params: { id },
      query,
    } = req;

    const [relatedTranslators, count] =
      await productService.getRelatedTranslators(id, query);

    successfulResponse({
      res,
      data: { translators: relatedTranslators, count },
    });
  }
}

export default GetProductController;
