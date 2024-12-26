import { Response } from "express";

import { Prisma } from "@prisma/client";

import ControllerConfiguration from "@/controllers/configuration.controller";
import slugify from "@/lib/slugify";
import { EmptyObject, UserAuthorizedReq } from "@/types";

import MESSAGES from "../constants/messages";
import DB from "../db";
import { hasProductPermission } from "../lib/permissions";

type DeleteReq = UserAuthorizedReq<EmptyObject, EmptyObject, { id: string }>;

type CreateReqBody = Omit<
  Prisma.ProductCreateInput,
  | "manager"
  | "category"
  | "tags"
  | "status"
  | "chapters"
  | "averageRate"
  | "id"
  | "priceInRials"
> & {
  priceInRials: string;
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

function connectNewId(id: string | undefined, key: string) {
  if (id == null) return {};
  return { [key]: { connect: { id } } };
}

class ProductsMutationController extends ControllerConfiguration {
  async createProduct(req: CreateReq, res: Response) {
    const {
      user: _,
      categoryId,
      tagsId,
      statusId,
      managerId,
      priceInRials,
      releaseYear,
      slug,
      ...restData
    } = req.body;

    const data = {
      ...restData,
      releaseYear: new Date(releaseYear),
      priceInRials: parseInt(priceInRials),
      slug: slugify(slug),
    };

    const createOptions = {
      data,
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
      const message = this.SHARED_MESSAGES.general.permissionAuthorization;
      const { forbidden } = this.STATUS_CODES;

      this.failedResponse({ res, code: forbidden, message });
    }

    const {
      user: _,
      categoryId,
      tagsId = [],
      statusId,
      managerId,
      priceInRials,
      releaseYear,
      slug,
      ...restData
    } = req.body;

    const tagsData = tagsId.sort().map((id) => ({ id }));

    const managerData = connectNewId(managerId, "manager");
    const categoryData = connectNewId(categoryId, "category");
    const statusData = connectNewId(statusId, "status");

    const data: Prisma.ProductUpdateInput = {
      ...restData,
      ...(releaseYear != null ? { releaseYear: new Date(releaseYear) } : {}),
      ...managerData,
      ...categoryData,
      ...statusData,
      tags: { set: tagsData },
    };

    if (priceInRials != null) {
      const newPriceInRials = parseInt(priceInRials);
      if (product.priceInRials !== newPriceInRials)
        data.priceInRials = newPriceInRials;
    }

    if (releaseYear != null) {
      const newReleaseYear = new Date(releaseYear);
      if (product.releaseYear !== newReleaseYear)
        data.releaseYear = newReleaseYear;
    }

    if (slug != null) {
      const newSlug = slugify(slug);
      if (product.slug !== newSlug) data.slug = newSlug;
    }

    await DB.update({ id: product.id, data });

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

  async deleteProduct(req: DeleteReq, res: Response) {
    const {
      body: { user },
      params: { id },
    } = req;

    const product = await DB.getById(id);

    if (product == null) return;

    if (!hasProductPermission(user, "delete", product)) {
      const message = this.SHARED_MESSAGES.general.permissionAuthorization;
      const { forbidden } = this.STATUS_CODES;

      return this.failedResponse({ res, code: forbidden, message });
    }

    const deletedProduct = await DB.delete(id);
    this.successfulResponse({
      res,
      message: MESSAGES.delete(deletedProduct.id),
    });
  }
}

export default ProductsMutationController;
