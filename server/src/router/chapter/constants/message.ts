import { Chapter } from "@prisma/client";

const CHAPTER_MESSAGES = {
  crud: (chapter: Chapter) => `فصل ${chapter.episode}ام `,
};

export default CHAPTER_MESSAGES;
