import createAccountPath from "./account.path";

const PATH = { getUser: "/get-user", account: createAccountPath() } as const;

export default PATH;
