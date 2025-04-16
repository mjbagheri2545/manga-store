import { z } from "zod";

import { required } from "@/validators";

export const productCommentSchema = z.object({
  message: required({ label: "پیام" }),
});

export type ProductCommentData = z.infer<typeof productCommentSchema>;
