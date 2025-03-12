import { Response } from "express";

import { Prisma, Product } from "@prisma/client";

import SHARED_MESSAGES from "@/constants/messages";
import { EmptyObject, UserAuthorizedReq } from "@/types";
import {
  failedOperation,
  getFilePath,
  getFilePathForDb,
  getFilePathFromDbFilePath,
  newModelConnectionWithId,
  removeFile,
  successfulResponse,
  updatedEntityFields,
  withCatch,
  writeFile,
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
  priceInRials: string;
  releaseYear: string;
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

    const productImagePath = await getFilePath({
      uploadPath: "uploads/productImage/",
      file: req.file!,
    });

    data.priceInRials = parseInt(data.priceInRials);
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
        message: "ایجاد محصول",
      });
    }

    const writeFileError = await writeFile(productImagePath, req.file!.buffer);

    if (writeFileError != null) {
      await removeFile(productImagePath);
    }

    productLogger.logMessage("Product created.", {
      metaData: { product: productLoggerData(product) },
    });

    const { create: createMessage } = SHARED_MESSAGES.crud;

    const message = createMessage(PRODUCT_MESSAGES.crud(product));

    successfulResponse({ res, message, data: { id: product.id } });
  }

  async updateProduct(req: UpdateProductReq, res: Response) {
    const { categoryId, tagsId = [], statusId, managerId, product } = req.body;

    const tagsConnection = getTagsData(tagsId, product.tags);

    const managerConnection = newModelConnectionWithId(managerId, "manager");
    const categoryConnection = newModelConnectionWithId(categoryId, "category");
    const statusConnection = newModelConnectionWithId(statusId, "status");

    const data = pickProductCreateData(req);
    if (data.priceInRials != null) {
      data.priceInRials = parseInt(data.priceInRials);
    }

    if (data.releaseYear != null) {
      data.releaseYear = parseInt(data.releaseYear);
    }

    const finalData: Prisma.ProductUpdateInput = {
      ...data,
      ...managerConnection,
      ...categoryConnection,
      ...statusConnection,
      ...tagsConnection,
    };

    if (req.file != null) {
      const productImagePath = await getFilePath({
        uploadPath: "uploads/productImage/",
        file: req.file!,
      });

      finalData.productImage = getFilePathForDb(productImagePath);
    }

    const [error, updatedProduct] = await withCatch(
      productService.update(product.id, finalData)
    );

    if (error != null) {
      return failedOperation({ res, message: "به‌روزرسانی محصول" });
    }

    if (req.file != null) {
      const writeFileError = await writeFile(
        getFilePathFromDbFilePath(String(finalData.productImage)),
        req.file.buffer
      );

      if (writeFileError != null) {
        return failedOperation({ res, message: "به‌روزرسانی محصول" });
      }

      const removeFileError = await removeFile(
        getFilePathFromDbFilePath(product.productImage)
      );

      if (removeFileError != null) {
        await removeFile(
          getFilePathFromDbFilePath(String(finalData.productImage))
        );
        return failedOperation({ res, message: "به‌روزرسانی محصول" });
      }
    }

    productLogger.logMessage("Product updated.", {
      metaData: updatedEntityFields(product, updatedProduct),
    });

    const { update: updateMessage } = SHARED_MESSAGES.crud;

    const message = updateMessage(PRODUCT_MESSAGES.crud(updatedProduct));

    successfulResponse({ res, message, data: { id: updatedProduct.id } });
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
      data: { product: updatedProduct },
    });
  }
}

export default ProductMutationController;
