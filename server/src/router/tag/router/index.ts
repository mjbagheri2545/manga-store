import { createGroupingModelsRouter } from "@/utils";

import tagLogger from "../constants/logger";
import tagService from "../services";

function createTagRouter() {
  const router = createGroupingModelsRouter({
    service: tagService,
    entityKey: "tag",
    logger: tagLogger,
  });

  return router;
}

export default createTagRouter;
