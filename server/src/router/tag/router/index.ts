import { createGroupingModelsRouter } from "@/utils";

import DB from "../db";

function createTagRouter() {
  const router = createGroupingModelsRouter({
    entityName: "ژانر",
    DB,
    entitiesKey: "tags",
  });

  return router;
}

export default createTagRouter;
