import { createCategories, deleteCategories } from "./category";
import { createProductStatuses, deleteProductStatuses } from "./productStatus";
import { createTags, deleteTags } from "./tag";

export async function deleteProductGroups() {
  await deleteCategories();
  await deleteTags();
  await deleteProductStatuses();
}

export function createProductGroups() {
  return Promise.all([
    createCategories(),
    createTags(),
    createProductStatuses(),
  ]);
}
