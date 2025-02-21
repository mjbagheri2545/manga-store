import { EntityKey } from "@/types";

import createBasePath from "./base.path";

function createAdminPath() {
  const basePath = createBasePath();

  function createPath(entityKey: EntityKey) {
    return `${basePath.admin}${basePath[entityKey]}`;
  }

  return {
    index: (entityKey: EntityKey) => createPath(entityKey),
    create: (entityKey: EntityKey) => `${createPath(entityKey)}/create`,
    info: (entityKey: EntityKey, id: string) =>
      `${createPath(entityKey)}/${id}`,
    update: (entityKey: EntityKey, id: string) =>
      `${createPath(entityKey)}/edit/${id}`,
  } as const;
}

export default createAdminPath;
