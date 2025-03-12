import createBasePath from "./base.path";

function createProductPath() {
  const { product: productPath } = createBasePath();

  function createPath(path: string) {
    return `${productPath}/${path}`;
  }

  return {
    singleProduct: (slug: string) => createPath(slug),
    byCategory: (category: string) => createPath(`category/${category}`),
    byTag: (tag: string) => createPath(`tag/${tag}`),
  } as const;
}

export default createProductPath;
