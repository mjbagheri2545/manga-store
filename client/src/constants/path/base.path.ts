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
  } as const;
}

export default createBasePath;
