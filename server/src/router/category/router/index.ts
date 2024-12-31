import { createGroupingModelsRouter } from "@/utils";

import DB from "../db";

function createCategoryRouter() {
  const router = createGroupingModelsRouter({
    entityName: "دسته بندی",
    DB,
    entitiesKey: "categories",
  });

  return router;
}

export default createCategoryRouter;
