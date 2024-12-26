const PATH = {
  index: "/",
  get: {
    byProductSlug: "/:productSlug",
    byCategory: "/category/:category",
    byTag: "/tag/:tag",
    byStatus: "/status/:status",
  },
} as const;

export default PATH;
