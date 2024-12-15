import { z } from "zod";

import ValidatorConfiguration from "@/validators/configuration.validator";

function createEnv() {
  const validator = new ValidatorConfiguration();

  const stringEnvKeys = ["VITE_API_END_POINT", "VITE_APP_TITLE"] as const;
  const stringsShape = stringEnvKeys.reduce(
    (shape, key) => {
      shape[key] = validator.required({ label: key });
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

export default createEnv();
