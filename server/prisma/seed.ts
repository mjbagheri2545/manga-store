import { createChapters } from "./customSeed/chapter";
import { deleteAll } from "./customSeed/deleteAll";
import { createPeakyBlinders } from "./customSeed/peakyBlinders";
import { createProducts } from "./customSeed/product";
import { productCommentsSeeds } from "./customSeed/productComment";
import { createProductGroups } from "./customSeed/productGroup";
import { createProductRatings } from "./customSeed/productRating";
import { createProductViews } from "./customSeed/productViews";
import { createUsers } from "./customSeed/user";

async function main() {
  await deleteAll();
  await createUsers();
  await createProductGroups();
  await createProducts();
  await createPeakyBlinders();
  await createChapters();
  await createProductRatings();
  await createProductViews();
  await productCommentsSeeds();
}
main().catch(console.log);
