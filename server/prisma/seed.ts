import { createManagers, deleteManagers } from "./customSeed/manager";
import { createProducts, deleteProducts } from "./customSeed/product";

async function main() {
  await deleteProducts();
  await deleteManagers();
  await createManagers();
  await createProducts();
}
main().catch(console.log);
