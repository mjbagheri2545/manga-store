import createBasePath from "./base.path";

function createChapterPath() {
  const basePath = createBasePath();

  function baseAdminChapterPath(productId: string) {
    return `${basePath.admin}${baseChapterPath(productId)}`;
  }

  function baseChapterPath(productPath: string) {
    return `${basePath.product}/${productPath}${basePath.chapter}`;
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
    api: baseChapterPath,
    singleChapter: (productSlug: string, id: string) =>
      `${baseChapterPath(productSlug)}/${id}`,
  } as const;
}

export default createChapterPath;
