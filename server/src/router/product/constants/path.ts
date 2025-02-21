const PRODUCT_PATH = {
  getBySlug: "/:slug",
  getByCategory: "/category/:category",
  getByTag: "/tag/:tag",
  getByStatus: "/status/:status",
} as const;

export default PRODUCT_PATH;
