import userAccountPath from "./account.path";

const USER_PATH = {
  getByToken: "/get-by-token",
  editProfile: "/edit-profile",
  account: userAccountPath,
} as const;

export default USER_PATH;
