import createBasePath from "./base.path";

function createChapterPath() {
  const basePath = createBasePath();

  function baseAdminChapterPath(productId: string) {
    return `${basePath.admin}${basePath.product}/${productId}${basePath.chapter}`;
  }

  return {
    admin: {
      index: baseAdminChapterPath,
      create: (productId: string) =>
        `${baseAdminChapterPath(productId)}/create`,
      edit: (productId: string, id: string) =>
        `${baseAdminChapterPath(productId)}/edit/${id}`,
      info: (productId: string, id: string) =>
        `${baseAdminChapterPath(productId)}/${id}`,
    },
    api: (productId: string) =>
      `${basePath.product}/${productId}${basePath.chapter}`,
  } as const;
}

export default createChapterPath;
