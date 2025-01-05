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
} from "@/utils";

import chapterLogger from "../constants/logger";
import CHAPTER_MESSAGES from "../constants/message";
import chapterService from "../services";

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
class Controller {
  async getAllChaptersOfProduct(req: GetAllChapterReq, res: Response) {
    const {
      query,
      params: { productId },
    } = req;

    const chapters = await chapterService.getAll(productId, query);

    successfulResponse({ res, data: { chapters } });
  }

  sendChapter(
    req: UserAuthorizedReq<{ chapter: PermissionChapter }>,
    res: Response
  ) {
    const { chapter } = req.body;

    const chapterData = pick(chapter, ["chapterFile", "episode", "id"]);

    successfulResponse({ res, data: { chapter: chapterData } });
  }

  async createChapter(req: CreateChapterReq, res: Response) {
    const { productId, translatorId, episode } = req.body;

    const createdChapter = await chapterService.create({
      data: { chapterFile: req.file?.path as string, episode },
      productId,
      translatorId,
    });

    chapterLogger.info("Chapter created.", createdChapter);

    const { create: createMessage } = SHARED_MESSAGES.features.crud;

    const message = createMessage(CHAPTER_MESSAGES.crud(createdChapter));

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

    chapterLogger.info("Chapter updated.", updatedChapter);

    const { update: updateMessage } = SHARED_MESSAGES.features.crud;

    const message = updateMessage(CHAPTER_MESSAGES.crud(updatedChapter));

    successfulResponse({ res, message });
  }
}

export default Controller;
