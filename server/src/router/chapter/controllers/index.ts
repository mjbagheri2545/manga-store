import { Response } from "express";

import { Chapter, Prisma } from "@prisma/client";

import SHARED_MESSAGES from "@/constants/messages";
import { EmptyObject, PaginateQueryWithSort, UserAuthorizedReq } from "@/types";
import {
  failedOperation,
  getFilePath,
  getFilePathForDb,
  newModelConnectionWithId,
  removeFile,
  successfulResponse,
  updateFile,
  withCatch,
  writeFile,
} from "@/utils";

import { ChapterBase, chapterLogger } from "../constants/global";
import chapterService from "../services";
import { chapterLoggerData } from "../utils";

type GetAllChaptersReq = UserAuthorizedReq<
  EmptyObject,
  PaginateQueryWithSort,
  { productId: string }
>;

type GetChapterReq = UserAuthorizedReq<{ chapter: ChapterBase }>;

type CreateChapterReqBody = {
  episode: string;
  translatorId: string;
};

type CreateChapterReq = UserAuthorizedReq<
  CreateChapterReqBody,
  EmptyObject,
  { productId: string }
>;

type UpdateChapterReq = UserAuthorizedReq<
  Partial<CreateChapterReqBody> & { chapter: Chapter }
>;
class ChapterController {
  async getAllChapters(req: GetAllChaptersReq, res: Response) {
    const {
      query,
      params: { productId },
    } = req;

    const [chapters, count] = await chapterService.getAll(productId, query);

    successfulResponse({ res, data: { chapters, count } });
  }

  getChapter(req: GetChapterReq, res: Response) {
    const { chapter } = req.body;

    successfulResponse({ res, data: { chapter } });
  }

  async createChapter(req: CreateChapterReq, res: Response) {
    const {
      body: { translatorId, episode },
      params: { productId },
    } = req;

    const chapterFilePath = await getFilePath({
      uploadPath: "private/uploads/chapterFile",
      file: req.file!,
      isPublic: false,
    });

    const [error, chapter] = await withCatch(
      chapterService.create({
        data: {
          episode: parseInt(episode),
          chapterFile: getFilePathForDb(chapterFilePath),
        },
        translatorId,
        productId,
      })
    );

    if (error != null) {
      return failedOperation({
        res,
        message: "افزودن فصل",
      });
    }

    const writeFileError = await writeFile(chapterFilePath, req.file!.buffer);

    if (writeFileError != null) {
      // remove chunks of file that has been written to server
      // and then delete already created product
      await removeFile(chapterFilePath);
      await chapterService.delete(chapter.id);
      return failedOperation({
        res,
        message: "افزودن فصل",
      });
    }

    chapterLogger.logMessage("Chapter created.", {
      metaData: chapterLoggerData(chapter),
    });

    const { create: createMessage } = SHARED_MESSAGES.crud;

    successfulResponse({
      res,
      message: createMessage("فصل"),
      data: { id: chapter.id },
    });
  }

  async updateChapter(req: UpdateChapterReq, res: Response) {
    const { chapter, translatorId, episode } = req.body;

    const translatorConnection = newModelConnectionWithId(
      translatorId,
      "translator"
    );

    const data: Prisma.ChapterUpdateInput = {
      ...translatorConnection,
    };

    if (episode != null) {
      data.episode = parseInt(episode);
    }

    if (req.file != null) {
      const chapterFilePath = await getFilePath({
        uploadPath: "private/uploads/chapterFile",
        file: req.file!,
        isPublic: false,
      });

      data.chapterFile = getFilePathForDb(chapterFilePath);
    }

    const [error, updatedChapter] = await withCatch(
      chapterService.update(chapter.id, data)
    );

    if (error != null) {
      return failedOperation({ res, message: "به‌روزرسانی فصل" });
    }

    if (req.file != null) {
      const updateChapterFileError = await updateFile({
        file: req.file,
        newFilePath: data.chapterFile,
        oldFilePath: chapter.chapterFile,
        isPublic: false,
      });

      if (updateChapterFileError != null) {
        return failedOperation({ res, message: "به‌روزرسانی محصول" });
      }
    }

    chapterLogger.logMessage("Chapter updated.", {
      metaData: {
        old: chapterLoggerData(chapter),
        new: chapterLoggerData(updatedChapter),
      },
    });

    const { update: updateMessage } = SHARED_MESSAGES.crud;

    successfulResponse({
      res,
      message: updateMessage("فصل"),
      data: { id: updatedChapter.id },
    });
  }
}

export default ChapterController;
