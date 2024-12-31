import { Response } from "express";

import { Prisma, Product } from "@prisma/client";

import ControllerConfiguration from "@/controllers/configuration.controller";
import { EmptyObject, UserAuthorizedReq } from "@/types";
import { newModelConnectionWithId, removeFile } from "@/utils";

import MESSAGES from "../constants/messages";
import DB from "../db";
import { hasProductPermission } from "../lib/permissions";
import { getTagsData, pickProductCreateData } from "../utils";

type CreateProductReqBody = Pick<
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

type CreateProductReq = UserAuthorizedReq<CreateProductReqBody>;

type ProductResponse = Product & {
  tags: {
    id: string;
  }[];
};

type UpdateProductReqBody = Partial<CreateProductReqBody> & {
  product: ProductResponse;
};

type UpdateProductReq = UserAuthorizedReq<UpdateProductReqBody>;

type UpdateRatingReq = UserAuthorizedReq<
  {
    rating: number;
  },
  EmptyObject,
  { productId: string }
>;

type DeleteReq = UserAuthorizedReq<{ product: ProductResponse }>;
class ProductsMutationController extends ControllerConfiguration {
  async createProduct(req: CreateProductReq, res: Response) {
    const { categoryId, tagsId, statusId, managerId } = req.body;

    const data = pickProductCreateData(req);

    const finalData = { ...data, productImage: req.file?.path as string };

    const createOptions = {
      data: finalData,
      categoryId,
      tagsId,
      statusId,
      managerId,
    };

    const product = await DB.create(createOptions);

    const { create: createMessage } = this.SHARED_MESSAGES.features.crud;

    this.successfulResponse({
      res,
      message: createMessage(`محصول با ${product.name}`),
    });
  }

  async updateProduct(req: UpdateProductReq, res: Response) {
    const { user, product } = req.body;

    if (!hasProductPermission(user, "update", product)) {
      return this.forbidden(res);
    }

    const { user: _, categoryId, tagsId = [], statusId, managerId } = req.body;

    const tagsConnection = getTagsData(tagsId, product.tags);

    const managerConnection = newModelConnectionWithId(managerId, "manager");
    const categoryConnection = newModelConnectionWithId(categoryId, "category");
    const statusConnection = newModelConnectionWithId(statusId, "status");

    const data = pickProductCreateData(req);

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

    const [updatedProduct] = await Promise.all([
      DB.update(product.id, finalData),
      removeFile(product.productImage),
    ]);

    const { update: updateMessage } = this.SHARED_MESSAGES.features.crud;

    this.successfulResponse({
      res,
      message: updateMessage(`محصول با ${updatedProduct.name}`),
    });
  }

  async updateProductRating(req: UpdateRatingReq, res: Response) {
    const {
      body: { user, rating },
      params: { productId },
    } = req;

    await DB.updateRating({ productId, ratedById: user.id, rating });

    this.successfulResponse({
      res,
      message: MESSAGES.updateRating,
    });
  }

  async deleteProduct(req: DeleteReq, res: Response) {
    const { user, product } = req.body;

    if (!hasProductPermission(user, "delete", product)) {
      return this.forbidden(res);
    }

    const deletedProduct = await DB.delete(product.id);

    const { delete: deleteMessage } = this.SHARED_MESSAGES.features.crud;
    this.successfulResponse({
      res,
      message: deleteMessage(`محصول با ${deletedProduct.name}`),
    });
  }
}

export default ProductsMutationController;
