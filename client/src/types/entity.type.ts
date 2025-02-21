export type ProductGroupEntityKey = "tag" | "category" | "productStatus";

// we need EntityKey for when we need
// specify a key in an object in generic,
// GetUserResponse: {user: User}
// if we want to make Response generic we need EntityKey
export type EntityKey = "user" | ProductGroupEntityKey;

export type WithId = {
  id: string;
};
