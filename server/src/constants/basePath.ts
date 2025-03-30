const PRODUCT_PATH = "/products";
const PRODUCT_GROUP_PATH = "/product-group";

const BASE_PATH = {
  auth: "/auth",
  user: "/users",
  product: PRODUCT_PATH,
  chapter: `${PRODUCT_PATH}/:productId/chapters`,
  tag: `${PRODUCT_GROUP_PATH}/tags`,
  category: `${PRODUCT_GROUP_PATH}/categories`,
  productStatus: `${PRODUCT_GROUP_PATH}/product-statuses`,
} as const;

export default BASE_PATH;
