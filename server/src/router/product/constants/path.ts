const PRODUCT_PATH = {
  getBySlug: "/by-slug/:slug",
  getByCategory: "/category/:category",
  getByTag: "/tag/:tag",
  rate: "/:id/rate",
  getRelatedProducts: "/:id/related-products",
  getRelatedTranslators: "/:slug/related-translators",
} as const;

export default PRODUCT_PATH;
