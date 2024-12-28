const PATH = {
  getByProductSlug: "/:productSlug",
  getByCategory: "/category/:category",
  getByTag: "/tag/:tag",
  getByStatus: "/status/:status",
} as const;

export default PATH;
