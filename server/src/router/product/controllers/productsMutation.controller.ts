import { Response } from "express";

import fs from "fs/promises";
import { Prisma } from "@prisma/client";

import ControllerConfiguration from "@/controllers/configuration.controller";
import { EmptyObject, IdReq, UserAuthorizedReq } from "@/types";
import { newModelConnectionWithId } from "@/utils";

import MESSAGES from "../constants/messages";
import DB from "../db";
import { hasProductPermission } from "../lib/permissions";
import { getTagsData, pickProductData } from "../utils";

type CreateReqBody = Pick<
  Prisma.ProductCreateInput,
  "name" | "persianName" | "writer" | "designer" | "summary" | "slug"
> & {
  priceInRials: number;
  releaseYear: number;
  tagsId: string[];
  statusId: string;
  categoryId: string;
  managerId: string;
};

type CreateReq = UserAuthorizedReq<CreateReqBody>;
type UpdateReq = UserAuthorizedReq<
  Partial<CreateReqBody>,
  EmptyObject,
  { id: string }
>;

type UpdateRatingReq = UserAuthorizedReq<
  {
    rating: number;
  },
  EmptyObject,
  { productId: string }
>;

class ProductsMutationController extends ControllerConfiguration {
  async createProduct(req: CreateReq, res: Response) {
    const { categoryId, tagsId, statusId, managerId } = req.body;

    const data = pickProductData(req);

    const finalData = { ...data, productImage: req.file?.path as string };

    const createOptions = {
      data: finalData,
      categoryId,
      tagsId,
      statusId,
      managerId,
    };

    const product = await DB.create(createOptions);

    this.successfulResponse({ res, message: MESSAGES.create(product.name) });
  }

  async updateProduct(req: UpdateReq, res: Response) {
    const { id } = req.params;
    const product = await DB.getById(id);

    if (product == null) return;

    const { user } = req.body;

    if (!hasProductPermission(user, "update", product)) {
      return this.forbidden(res);
    }

    const { user: _, categoryId, tagsId = [], statusId, managerId } = req.body;

    const tagsConnection = getTagsData(tagsId, product.tags);

    const managerConnection = newModelConnectionWithId(managerId, "manager");
    const categoryConnection = newModelConnectionWithId(categoryId, "category");
    const statusConnection = newModelConnectionWithId(statusId, "status");

    const data = pickProductData(req);

    const finalData: Prisma.ProductUpdateInput = {
      ...data,
      ...managerConnection,
      ...categoryConnection,
      ...statusConnection,
      ...tagsConnection,
    };

    if (req.file != null) {
      finalData.productImage = req.file.path;
    }

    await DB.update(product.id, finalData);
    await fs.access(product.productImage);
    await fs.unlink(product.productImage);

    this.successfulResponse({ res, message: MESSAGES.update(product.name) });
  }

  async updateProductRating(req: UpdateRatingReq, res: Response) {
    const {
      body: { user, rating },
      params: { productId },
    } = req;

    await DB.updateRating({ productId, ratedById: user.id, rating });

    this.successfulResponse({ res, message: MESSAGES.updateRating });
  }

  async deleteProduct(req: IdReq, res: Response) {
    const {
      body: { user },
      params: { id },
    } = req;

    const product = await DB.getById(id);

    if (product == null) return;

    if (!hasProductPermission(user, "delete", product)) {
      return this.forbidden(res);
    }

    const deletedProduct = await DB.delete(id);
    this.successfulResponse({
      res,
      message: MESSAGES.delete(deletedProduct.id),
    });
  }
}

export default ProductsMutationController;
