import userAccountPath from "./account.path";

const PATH = {
  getByToken: "/get-by-token",
  editProfile: "/edit-profile",
  account: userAccountPath,
} as const;

export default PATH;
