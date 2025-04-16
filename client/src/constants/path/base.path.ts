function createBasePath() {
  return {
    auth: "/auth",
    admin: "/admin",
    user: "/users",
    home: "/",
    category: "/categories",
    tag: "/tags",
    productStatus: "/product-statuses",
    product: "/products",
    chapter: "/chapters",
    productComment: "/product-comments",
    productGroup: (path: string) => `product-group${path}`,
  } as const;
}

export default createBasePath;
