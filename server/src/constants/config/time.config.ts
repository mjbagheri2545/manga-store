function createTimeConfig() {
  return {
    minutesUntilResendingEmail: 1,
    identificationExpirationMinutes: 3,
  } as const;
}

export default createTimeConfig;
