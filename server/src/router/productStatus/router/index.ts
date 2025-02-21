import { createProductGroupModelRouter } from "@/utils/features/productGroup.util";

import productStatusLogger from "../constants/logger";
import productStatusService from "../services";

function createProductStatusRouter() {
  const router = createProductGroupModelRouter({
    service: productStatusService,
    entityKey: "productStatus",
    logger: productStatusLogger,
  });

  return router;
}

export default createProductStatusRouter;
