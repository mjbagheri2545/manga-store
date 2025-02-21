import { createProductGroupModelRouter } from "@/utils/features/productGroup.util";

import tagLogger from "../constants/logger";
import tagService from "../services";

function createTagRouter() {
  const router = createProductGroupModelRouter({
    service: tagService,
    entityKey: "tag",
    logger: tagLogger,
  });

  return router;
}

export default createTagRouter;
