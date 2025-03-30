import createBasePath from "./base.path";

function createProductPath() {
  const { product: productPath } = createBasePath();

  function createPath(path: string) {
    return `${productPath}/${path}`;
  }

  return {
    singleProduct: (slug: string) => createPath(slug),
    productTranslators: (slug: string) => `${createPath(slug)}/translators`,
    productChapters: (slug: string) => `${createPath(slug)}/chapters`,
    byCategory: (category: string) => createPath(`category/${category}`),
    byTag: (tag: string) => createPath(`tag/${tag}`),
    getRelatedProducts: (id: string) => createPath(`${id}/related-products`),
    getRelatedTranslators: (id: string) =>
      createPath(`${id}/related-translators`),
  } as const;
}

export default createProductPath;
