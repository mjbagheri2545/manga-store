import { z } from "zod";

import { minLength, required } from "@/validators";

const createProductGroupSchema = z.object({
  name: minLength({ label: "اسم" }),
  slug: required({ label: "آدرس اینترنتی" }),
});

export type CreateProductGroupData = z.infer<typeof createProductGroupSchema>;

export default createProductGroupSchema;
