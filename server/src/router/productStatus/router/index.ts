import { createGroupingModelsRouter } from "@/utils";

import productStatusLogger from "../constants/logger";
import productStatusService from "../services";

function createCategoryRouter() {
  const router = createGroupingModelsRouter({
    service: productStatusService,
    entityKey: "productStatus",
    logger: productStatusLogger,
  });

  return router;
}

export default createCategoryRouter;
