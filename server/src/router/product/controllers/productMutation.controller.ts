import { Response } from "express";

import { Prisma, Product } from "@prisma/client";

import SHARED_MESSAGES from "@/constants/messages";
import { EmptyObject, UserAuthorizedReq } from "@/types";
import {
  newModelConnectionWithId,
  removeFile,
  successfulResponse,
  updatedEntityFields,
} from "@/utils";

import productLogger from "../constants/logger";
import PRODUCT_MESSAGES from "../constants/messages";
import productService from "../services";
import {
  getTagsData,
  pickProductCreateData,
  productLoggerData,
} from "../utils";

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

class ProductMutationController {
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

    const product = await productService.create(createOptions);

    productLogger.logMessage("Product created.", {
      metaData: { product: productLoggerData(product) },
    });

    const { create: createMessage } = SHARED_MESSAGES.crud;

    const message = createMessage(PRODUCT_MESSAGES.crud(product));

    successfulResponse({ res, message, data: { product } });
  }

  async updateProduct(req: UpdateProductReq, res: Response) {
    const { categoryId, tagsId = [], statusId, managerId, product } = req.body;

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
      productService.update(product.id, finalData),
      removeFile(product.productImage),
    ]);

    productLogger.logMessage("Product updated.", {
      metaData: updatedEntityFields(product, updatedProduct),
    });

    const { update: updateMessage } = SHARED_MESSAGES.crud;

    const message = updateMessage(PRODUCT_MESSAGES.crud(updatedProduct));

    successfulResponse({ res, message, data: { product: updatedProduct } });
  }

  async updateProductRating(req: UpdateRatingReq, res: Response) {
    const {
      body: { user, rating },
      params: { productId },
    } = req;

    const updatedProduct = await productService.updateRating({
      productId,
      ratedById: user.id,
      rating,
    });

    productLogger.logMessage("Product rating updated.", {
      metaData: {
        rating,
        newProductRating: updatedProduct.averageRating?.rating,
      },
    });

    successfulResponse({
      res,
      message: PRODUCT_MESSAGES.updateRating,
    });
  }
}

export default ProductMutationController;
