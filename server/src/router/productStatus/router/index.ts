import { createGroupingModelsRouter } from "@/utils";

import DB from "../db";

function createCategoryRouter() {
  const router = createGroupingModelsRouter({
    entityName: "وضعیت محصول",
    DB,
    entitiesKey: "productStatuses",
  });

  return router;
}

export default createCategoryRouter;
