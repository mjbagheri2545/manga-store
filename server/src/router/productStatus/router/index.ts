import { createGroupingModelsRouter } from "@/utils";

import productStatusLogger from "../constants/logger";
import productStatusService from "../services";

function createProductStatusRouter() {
  const router = createGroupingModelsRouter({
    service: productStatusService,
    entityKey: "productStatus",
    logger: productStatusLogger,
  });

  return router;
}

export default createProductStatusRouter;
