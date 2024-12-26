import { Router } from "express";

import PATH from "../constants/path";
import GetProductsController from "../controllers/getProducts.controller";
import GetProductsValidator from "../validators/getProducts.validator";

// we can't use router.use for this routes because these routes
// does not have a same parent path to group these routes like below path
// /account/password/recovery/get-email
// /account/password/recovery

function createGetProductsRoutes(router: Router) {
  const {
    jwtAuthorization,
    getAll,
    getByProductSlug,
    getByCategory,
    getByTag,
    getByStatus,
  } = new GetProductsController();

  const { get: path, index } = PATH;

  const {
    productSlugValidation,
    categoryValidation,
    statusValidation,
    tagValidation,
  } = new GetProductsValidator();

  router.get(index, jwtAuthorization, getAll);

  router.get(
    path.byProductSlug,
    productSlugValidation(),
    jwtAuthorization,
    getByProductSlug
  );

  router.get(
    path.byCategory,
    categoryValidation(),
    jwtAuthorization,
    getByCategory
  );

  router.get(path.byTag, tagValidation(), jwtAuthorization, getByTag);
  router.get(path.byStatus, statusValidation(), jwtAuthorization, getByStatus);
}

export default createGetProductsRoutes;
