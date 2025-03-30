import userAccountPath from "./account.path";

const USER_PATH = {
  getByToken: "/get-by-token",
  editProfile: "/edit-profile",
  getManagers: "/managers",
  getTranslators: "/translators",
  account: userAccountPath,
} as const;

export default USER_PATH;
