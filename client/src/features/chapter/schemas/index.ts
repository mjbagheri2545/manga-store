import { z } from "zod";

import { fileValidator, minNumber, required } from "@/validators";

import CHAPTER_MESSAGES from "../constants/messages";

const chapterStatusSchema = z.union([
  z.literal("public"),
  z.literal("private"),
  z.literal("purchased"),
]);

export const createChapterSchema = z.object({
  episode: minNumber({ label: "قسمت" }),
  chapterFile: fileValidator("فایل فصل").refine(
    (file) => file.size === 0 || file.type.startsWith("application/pdf"),
    CHAPTER_MESSAGES.invalidChapterFile
  ),
  translatorId: required({ label: "مترجم" }),
  chapterStatus: chapterStatusSchema,
});

export type CreateChapterData = z.infer<typeof createChapterSchema>;

export const updateChapterSchema = createChapterSchema.partial({
  chapterFile: true,
});

export type UpdateChapterData = z.infer<typeof updateChapterSchema>;
