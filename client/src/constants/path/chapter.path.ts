import createBasePath from "./base.path";

function createChapterPath() {
  const basePath = createBasePath();

  function baseChapterBase(productId: string) {
    return `${basePath.admin}${basePath.product}/${productId}${basePath.chapter}`;
  }

  return {
    admin: {
      index: baseChapterBase,
      create: (productId: string) => `${baseChapterBase(productId)}/create`,
      edit: (productId: string, id: string) =>
        `${baseChapterBase(productId)}/edit/${id}`,
      info: (productId: string, id: string) =>
        `${baseChapterBase(productId)}/${id}`,
    },
    api: (productId: string) =>
      `${basePath.product}/${productId}${basePath.chapter}`,
  } as const;
}

export default createChapterPath;
