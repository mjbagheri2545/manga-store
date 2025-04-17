import { Response } from "express";

import { Prisma } from "@prisma/client";

import SHARED_MESSAGES from "@/constants/messages";
import { UserAuthorizedReq } from "@/types";
import {
  failedOperation,
  getFilePath,
  getFilePathForDb,
  newModelConnectionWithId,
  removeFile,
  successfulResponse,
  updateFile,
  withCatch,
  writeFile,
} from "@/utils";

import { ProductBase, productLogger } from "../constants/global";
import PRODUCT_MESSAGES from "../constants/messages";
import productService from "../services";
import {
  calculateAverageProductRating,
  pickProductCreateData,
  productLoggerData,
} from "../utils";

type CreateProductReqBody = Pick<
  Prisma.ProductCreateInput,
  "name" | "persianName" | "writer" | "designer" | "summary" | "slug"
> & {
  oneChapterPriceInToman: string;
  releaseYear: string;
  tagsId: string[];
  statusId: string;
  categoryId: string;
  managerId: string;
};

type CreateProductReq = UserAuthorizedReq<CreateProductReqBody>;

type UpdateProductReqBody = Partial<CreateProductReqBody> & {
  product: ProductBase & {
    tags: {
      id: string;
    }[];
  };
};

type UpdateProductReq = UserAuthorizedReq<UpdateProductReqBody>;

type UpdateRatingReq = UserAuthorizedReq<{
  ratingNumber: number;
  product: {
    id: string;
  };
}>;

class ProductMutationController {
  async createProduct(req: CreateProductReq, res: Response) {
    const { categoryId, tagsId, statusId, managerId } = req.body;

    const data = pickProductCreateData(req);

    const productImagePath = await getFilePath({
      uploadPath: "uploads/productImage",
      file: req.file!,
    });

    data.oneChapterPriceInToman = parseInt(data.oneChapterPriceInToman);
    data.releaseYear = parseInt(data.releaseYear);

    const finalData = {
      ...data,
      productImage: getFilePathForDb(productImagePath),
    };

    const createOptions = {
      data: finalData,
      categoryId,
      tagsId,
      statusId,
      managerId,
    };

    const [error, product] = await withCatch(
      productService.create(createOptions)
    );

    if (error != null) {
      return failedOperation({
        res,
        message: "افزودن محصول",
      });
    }

    const writeFileError = await writeFile(productImagePath, req.file!.buffer);

    if (writeFileError != null) {
      // remove chunks of file that has been written to server
      // and then delete already created product
      await removeFile(productImagePath);
      await productService.delete(product.id);
      return failedOperation({
        res,
        message: "افزودن محصول",
      });
    }

    productLogger.logMessage("Product created.", {
      metaData: productLoggerData(product),
    });

    const { create: createMessage } = SHARED_MESSAGES.crud;

    successfulResponse({
      res,
      message: createMessage("محصول"),
      data: { id: product.id },
    });
  }

  async updateProduct(req: UpdateProductReq, res: Response) {
    const { categoryId, tagsId, statusId, managerId, product } = req.body;

    const managerConnection = newModelConnectionWithId(managerId, "manager");
    const categoryConnection = newModelConnectionWithId(categoryId, "category");
    const statusConnection = newModelConnectionWithId(statusId, "status");

    const data = pickProductCreateData(req);
    if (data.oneChapterPriceInToman != null) {
      data.oneChapterPriceInToman = parseInt(data.oneChapterPriceInToman);
    }

    if (data.releaseYear != null) {
      data.releaseYear = parseInt(data.releaseYear);
    }

    const finalData: Prisma.ProductUpdateInput = {
      ...data,
      ...managerConnection,
      ...categoryConnection,
      ...statusConnection,
    };

    if (req.file != null) {
      const productImagePath = await getFilePath({
        uploadPath: "uploads/productImage",
        file: req.file!,
      });

      finalData.productImage = getFilePathForDb(productImagePath);
    }

    if (tagsId != null) {
      finalData.tags = {
        set: tagsId.map((id) => ({
          id,
        })),
      };
    }

    const [error, updatedProduct] = await withCatch(
      productService.update(product.id, finalData)
    );

    if (error != null) {
      return failedOperation({ res, message: "به‌روزرسانی محصول" });
    }

    if (req.file != null) {
      const updateProductImageError = await updateFile({
        file: req.file,
        newFilePath: finalData.productImage,
        oldFilePath: product.productImage,
      });

      if (updateProductImageError != null) {
        return failedOperation({ res, message: "به‌روزرسانی محصول" });
      }
    }

    productLogger.logMessage("Product updated.", {
      metaData: {
        old: productLoggerData(product),
        new: productLoggerData(updatedProduct),
      },
    });

    const { update: updateMessage } = SHARED_MESSAGES.crud;

    successfulResponse({
      res,
      message: updateMessage("محصول"),
      data: { id: updatedProduct.id },
    });
  }

  async updateProductRating(req: UpdateRatingReq, res: Response) {
    const {
      body: { user, ratingNumber, product },
    } = req;

    const productRating = await productService.rate({
      productId: product.id,
      ratedById: user.id,
      ratingNumber,
    });

    const { ratings } = productRating.product;

    const ratingsCount = productRating.product._count.ratings;
    const averageRating = calculateAverageProductRating(ratings, ratingsCount);

    const viewerRating = ratings.find((rating) => rating.ratedById === user.id);

    const newRating = {
      averageRating,
      ratingsCount,
      myRating: viewerRating?.rating,
    };

    productLogger.logMessage("Product rating added.", {
      metaData: {
        ratingNumber,
        newProductRating: newRating,
        productId: product.id,
      },
    });

    successfulResponse({
      res,
      message: PRODUCT_MESSAGES.updateRating,
      data: {
        rating: newRating,
      },
    });
  }
}

export default ProductMutationController;
