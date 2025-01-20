import { z } from "zod";

import { required } from "@/validators";

function createEnv() {
  const stringEnvKeys = ["VITE_API_END_POINT", "VITE_APP_TITLE"] as const;

  const stringsShape = stringEnvKeys.reduce(
    (shape, key) => {
      shape[key] = required({ label: key });
      return shape;
    },
    {} as Record<(typeof stringEnvKeys)[number], z.ZodString>
  );

  const envSchema = z
    .object({
      VITE_REQUEST_TIMEOUT: z.coerce.number(),
    })
    .extend(stringsShape);

  return envSchema.parse(import.meta.env);
}

const env = createEnv();

export default env;
