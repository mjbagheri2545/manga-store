import createAccountPath from "./account.path";

const PATH = {
  getByToken: "/get-by-token",
  editProfile: "/edit-profile",
  account: createAccountPath(),
} as const;

export default PATH;
