import { $Enums } from "@prisma/client";

const CHAPTER_MESSAGES = {
  invalidStatus: `وضعیت فصل نامعتبر است، وضعیت فصل باید یکی از مقادیر ${Object.values($Enums.ChapterStatus).join(", ")} باشد.`,
} as const;

export default CHAPTER_MESSAGES;
