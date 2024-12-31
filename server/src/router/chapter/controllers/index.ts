import { Response } from "express";

import { Prisma } from "@prisma/client";

import ControllerConfiguration from "@/controllers/configuration.controller";
import { EmptyObject, PaginateQuery, UserAuthorizedReq } from "@/types";
import { newModelConnectionWithId, removeFile } from "@/utils";

import DB from "../db";
import { hasChapterPermission, PermissionChapter } from "../lib/permissions";

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

type DeleteChapterReq = UserAuthorizedReq<{ chapter: PermissionChapter }>;
class Controller extends ControllerConfiguration {
  async getAllChaptersOfProduct(req: GetAllChapterReq, res: Response) {
    const {
      query,
      params: { productId },
    } = req;

    const chapters = await DB.getAll(productId, query);

    this.successfulResponse({ res, data: { chapters } });
  }

  async createChapter(req: CreateChapterReq, res: Response) {
    const { productId, translatorId, episode } = req.body;

    await DB.create({
      data: { chapterFile: req.file?.path as string, episode },
      productId,
      translatorId,
    });

    const { create: createMessage } = this.SHARED_MESSAGES.features.crud;

    this.successfulResponse({
      res,
      message: createMessage(`فصل ${episode}`),
    });
  }

  async updateChapter(req: UpdateChapterReq, res: Response) {
    const { user, chapter } = req.body;

    if (!hasChapterPermission(user, "update", chapter)) {
      return this.forbidden(res);
    }

    const { productId, translatorId, episode } = req.body;

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
      DB.update(chapter.id, data),
      removeFile(chapter.chapterFile),
    ]);

    const { update: updateMessage } = this.SHARED_MESSAGES.features.crud;

    this.successfulResponse({
      res,
      message: updateMessage(`فصل ${updatedChapter.episode}`),
    });
  }

  async deleteChapter(req: DeleteChapterReq, res: Response) {
    const { user, chapter } = req.body;

    if (hasChapterPermission(user, "delete", chapter)) {
      return this.forbidden(res);
    }
    const deletedChapter = await DB.delete(chapter.id);

    const { delete: deleteChapterMessage } = this.SHARED_MESSAGES.features.crud;

    this.successfulResponse({
      res,
      message: deleteChapterMessage(`فصل ${deletedChapter.episode}`),
    });
  }
}

export default Controller;
