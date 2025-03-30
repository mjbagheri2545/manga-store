import { Router } from "express";

import { idAuthorization, jwtAuthorization } from "@/middlewares";
import { getAllEntities } from "@/middlewares/crud.middleware";
import { slugValidation } from "@/validators";

import PRODUCT_PATH from "../constants/path";
import GetProductController from "../controllers/getProduct.controller";
import productService from "../services";

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

  const getProductById = idAuthorization({
    getByIdQuery: (id) =>
      productService.getById(id, {
        include: {
          tags: { select: { id: true } },
          category: { select: { id: true } },
          manager: { select: { id: true } },
          status: { select: { id: true } },
        },
      }),
    entityKey: "product",
  });

  router.get("/:id", jwtAuthorization, getProductById, getProduct);

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
    getProductById,
    jwtAuthorization,
    getRelatedProducts
  );

  router.get(
    PRODUCT_PATH.getRelatedTranslators,
    slugValidation("slug", "آدرس اینترنتی محصول"),
    jwtAuthorization,
    getRelatedTranslators
  );
}

export default createGetProductsRoutes;
