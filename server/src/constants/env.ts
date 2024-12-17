import { z } from "zod";

function createEnv() {
  const STRING_ENV_KEYS = [
    "APP_NAME",
    "DOMAIN",
    "CLIENT_END_POINT",
    "HOST",
    "JWT_PRIVATE_TOKEN_KEY",
    "EMAIL_SERVICE_NAME",
    "EMAIL_SERVICE_USER",
    "EMAIL_SERVICE_PASS",
    "EMAIL_SERVICE_FROM",
  ] as const;

  const stringSchemaShape = STRING_ENV_KEYS.reduce(
    (shape, key) => {
      shape[key] = z.string().min(1);
      return shape;
    },
    {} as Record<(typeof STRING_ENV_KEYS)[number], z.ZodString>
  );

  const envSchema = z
    .object({
      NODE_ENV: z
        .union([
          z.literal("development"),
          z.literal("testing"),
          z.literal("production"),
        ])
        .default("development"),
      PORT: z.coerce.number(),
    })
    .extend(stringSchemaShape);

  return envSchema.parse(process.env);
}

const env = createEnv();

export default env;
