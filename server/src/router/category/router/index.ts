import { createGroupingModelsRouter } from "@/utils";

import categoryLogger from "../constants/logger";
import categoryService from "../services";

function createCategoryRouter() {
  const router = createGroupingModelsRouter({
    service: categoryService,
    entityKey: "category",
    logger: categoryLogger,
  });

  return router;
}

export default createCategoryRouter;
