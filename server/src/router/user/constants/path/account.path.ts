const userAccountPath = {
  verification: {
    base: "/account/verification",
    getEmail: "/get-email",
    verify: "/:verificationCode",
  },
  password: {
    base: "/account/password",
    recovery: {
      getEmail: "/recovery/get-email",
      recover: "/recovery/:verificationCode",
    },
    reset: "/reset",
  },
} as const;

export default userAccountPath;
