import createBasePath from "./base.path";

function createProductCommentPath() {
  const basePath = createBasePath();

  function baseAdminProductCommentPath(productId: string) {
    return `${basePath.admin}${basePath.product}/${productId}${basePath.productComment}`;
  }

  return {
    admin: {
      index: baseAdminProductCommentPath,
      info: (productId: string, id: string) =>
        `${baseAdminProductCommentPath(productId)}/${id}`,
    },
    api: (productId: string) =>
      `${basePath.product}/${productId}${basePath.productComment}`,
  } as const;
}

export default createProductCommentPath;
