import { Chapter, Product, ProductGroup, User } from "./model.type";

export type ProductGroupEntityKey = "tag" | "category" | "productStatus";

// we need EntityKey for when we need
// specify a key in an object in generic,
// GetUserResponse: {user: User}
// if we want to make Response generic we need EntityKey
export type EntityKey = ProductGroupEntityKey | "user" | "product" | "chapter";

export type Entity = ProductGroup | User | Product | Chapter;
