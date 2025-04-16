import createBasePath from "./base.path";

function createProductPath() {
  const basePath = createBasePath();

  function createPath(path: string) {
    return `${basePath.product}/${path}`;
  }

  return {
    singleProduct: (slug: string) => createPath(slug),
    productTranslators: (slug: string) => `${createPath(slug)}/translators`,
    productChapters: (slug: string) =>
      `${createPath(slug)}/${basePath.chapter.slice(1)}`,
    productComments: (slug: string) =>
      `${createPath(slug)}/${basePath.productComment.slice(1)}`,
    byCategory: (category: string) => createPath(`category/${category}`),
    byTag: (tag: string) => createPath(`tag/${tag}`),
    getRelatedProducts: (id: string) => createPath(`${id}/related-products`),
    getRelatedTranslators: (id: string) =>
      createPath(`${id}/related-translators`),
  } as const;
}

export default createProductPath;
