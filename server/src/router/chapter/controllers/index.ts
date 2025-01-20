import { Response } from "express";

import { Prisma } from "@prisma/client";

import SHARED_MESSAGES from "@/constants/messages";
import {
  EmptyObject,
  PaginateQuery,
  PermissionChapter,
  UserAuthorizedReq,
} from "@/types";
import {
  newModelConnectionWithId,
  pick,
  removeFile,
  successfulResponse,
  updatedEntityFields,
} from "@/utils";

import chapterLogger from "../constants/logger";
import CHAPTER_MESSAGES from "../constants/messages";
import chapterService from "../services";
import { chapterLoggerData } from "../utils";

type GetAllChapterReq = UserAuthorizedReq<
  EmptyObject,
  PaginateQuery,
  { productId: string }
>;

type CreateChapterReqBody = {
  episode: number;
  chapterFile: string;
  productId: string;
  translatorId: string;
};

type CreateChapterReq = UserAuthorizedReq<CreateChapterReqBody>;

type UpdateChapterReq = UserAuthorizedReq<
  Partial<CreateChapterReqBody> & { chapter: PermissionChapter }
>;
class ChapterController {
  async getAllChapters(req: GetAllChapterReq, res: Response) {
    const {
      query,
      params: { productId },
    } = req;

    const chapters = await chapterService.getAll(productId, query);

    successfulResponse({ res, data: { chapters } });
  }

  getChapter(
    req: UserAuthorizedReq<{ chapter: PermissionChapter }>,
    res: Response
  ) {
    const { chapter } = req.body;

    const chapterData = pick(chapter, ["chapterFile", "episode", "id"]);

    successfulResponse({ res, data: { chapter: chapterData } });
  }

  async createChapter(req: CreateChapterReq, res: Response) {
    const { productId, translatorId, episode } = req.body;

    const chapter = await chapterService.create({
      data: { chapterFile: req.file?.path as string, episode },
      productId,
      translatorId,
    });

    chapterLogger.logMessage("Chapter created.", {
      metaData: { chapter: chapterLoggerData(chapter) },
    });

    const { create: createMessage } = SHARED_MESSAGES.features.crud;

    const message = createMessage(CHAPTER_MESSAGES.crud(chapter));

    successfulResponse({ res, message });
  }

  async updateChapter(req: UpdateChapterReq, res: Response) {
    const { chapter, productId, translatorId, episode } = req.body;

    const productConnection = newModelConnectionWithId(productId, "product");
    const translatorConnection = newModelConnectionWithId(
      translatorId,
      "translator"
    );

    const data: Prisma.ChapterUpdateInput = {
      episode,
      ...productConnection,
      ...translatorConnection,
    };

    if (req.file != null) {
      data.chapterFile = req.file.path;
    }

    const [updatedChapter] = await Promise.all([
      chapterService.update(chapter.id, data),
      removeFile(chapter.chapterFile),
    ]);

    chapterLogger.logMessage("Chapter updated.", {
      metaData: updatedEntityFields(chapter, updatedChapter),
    });

    const { update: updateMessage } = SHARED_MESSAGES.features.crud;

    const message = updateMessage(CHAPTER_MESSAGES.crud(updatedChapter));

    successfulResponse({ res, message });
  }
}

export default ChapterController;
