import { createProductGroupModelRouter } from "@/utils/features/productGroup.util";

import categoryLogger from "../constants/logger";
import categoryService from "../services";

function createCategoryRouter() {
  const router = createProductGroupModelRouter({
    service: categoryService,
    entityKey: "category",
    logger: categoryLogger,
  });

  return router;
}

export default createCategoryRouter;
