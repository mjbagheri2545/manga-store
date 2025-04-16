import { Router } from "express";

import { idAuthorization, jwtAuthorization } from "@/middlewares";
import { getAllEntities } from "@/middlewares/crud.middleware";
import { slugValidation } from "@/validators";
import { productIdValidation } from "@/validators/chapter_productComment.validator";

import { PRODUCT_BASE_SELECT } from "../constants/global";
import PRODUCT_PATH from "../constants/path";
import GetProductController from "../controllers/getProduct.controller";
import productService, { GetProductByIdOptions } from "../services";

// we can't use router.use for this routes because these routes
// does not have a same parent path to group these routes like below path
// /account/password/recovery/get-email
// /account/password/recovery

function createGetProductsRoutes(router: Router) {
  const {
    getAllProductGroups,
    getProduct,
    getProductBySlug,
    getProductsByCategory,
    getProductsByTag,
    getRelatedProducts,
    getRelatedTranslators,
  } = new GetProductController();

  const getAllProducts = getAllEntities({
    getAll: productService.getAll,
    entitiesKey: "products",
  });

  router.get("/product-groups", jwtAuthorization, getAllProductGroups);

  router.get("/", jwtAuthorization, getAllProducts);

  const createGetProductById = (options?: GetProductByIdOptions) =>
    idAuthorization({
      getByIdQuery: (id) => productService.getById(id, options),
      entityKey: "product",
    });

  router.get(
    "/:id",
    jwtAuthorization,
    createGetProductById({
      select: PRODUCT_BASE_SELECT,
    }),
    getProduct
  );

  router.get(
    PRODUCT_PATH.getBySlug,
    slugValidation("slug", "آدرس اینترنتی محصول"),
    jwtAuthorization,
    getProductBySlug
  );

  router.get(
    PRODUCT_PATH.getByCategory,
    slugValidation("category", "دسته بندی"),
    jwtAuthorization,
    getProductsByCategory
  );

  router.get(
    PRODUCT_PATH.getByTag,
    slugValidation("tag", "ٖژانز"),
    jwtAuthorization,
    getProductsByTag
  );

  router.get(
    PRODUCT_PATH.getRelatedProducts,
    slugValidation(),
    createGetProductById({
      select: { categoryId: true, tags: { select: { id: true } } },
    }),
    jwtAuthorization,
    getRelatedProducts
  );

  router.get(
    PRODUCT_PATH.getRelatedTranslators,
    productIdValidation(),
    createGetProductById(),
    jwtAuthorization,
    getRelatedTranslators
  );
}

export default createGetProductsRoutes;
