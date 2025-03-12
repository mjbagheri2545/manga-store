const PRODUCT_PATH = {
  getBySlug: "/:slug",
  getByCategory: "/category/:category",
  getByTag: "/tag/:tag",
  updateRating: "/:id/update-rating",
} as const;

export default PRODUCT_PATH;
