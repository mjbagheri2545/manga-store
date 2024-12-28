import { Response } from "express";

import fs from "fs/promises";
import { Prisma } from "@prisma/client";

import ControllerConfiguration from "@/controllers/configuration.controller";
import { EmptyObject, PaginateQuery, UserAuthorizedReq } from "@/types";
import { newModelConnectionWithId } from "@/utils";

import MESSAGES from "../constants/messages";
import DB from "../db";
import { hasChapterPermission } from "../lib/permissions";

type GetAllReq = UserAuthorizedReq<
  EmptyObject,
  PaginateQuery,
  { productId: string }
>;

type GetReq = UserAuthorizedReq<EmptyObject, EmptyObject, { id: string }>;

type CreateReqBody = {
  episode: number;
  chapterFile: string;
  productId: string;
  translatorId: string;
};

type CreateReq = UserAuthorizedReq<CreateReqBody>;

type UpdateReq = UserAuthorizedReq<
  Partial<CreateReqBody>,
  EmptyObject,
  { id: string }
>;

type DeleteReq = UserAuthorizedReq<EmptyObject, EmptyObject, { id: string }>;

class Controller extends ControllerConfiguration {
  async getAllChaptersOfProduct(req: GetAllReq, res: Response) {
    const {
      query,
      params: { productId },
    } = req;

    const chapters = await DB.getAll(productId, query);

    this.successfulResponse({ res, data: { chapters } });
  }

  async getById(req: GetReq, res: Response) {
    const { id } = req.params;

    const chapter = await DB.getById(id);

    this.successfulResponse({ res, data: { chapter } });
  }

  async createChapter(req: CreateReq, res: Response) {
    const { productId, translatorId, episode } = req.body;

    await DB.create({
      data: { chapterFile: req.file?.path as string, episode },
      productId,
      translatorId,
    });

    this.successfulResponse({ res, message: MESSAGES.create(episode) });
  }

  async updateChapter(req: UpdateReq, res: Response) {
    const { id } = req.params;
    const chapter = await DB.getById(id);

    if (chapter == null) return;

    const { user } = req.body;

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

    const updatedChapter = await DB.update(chapter.id, data);

    await DB.update(chapter.id, data);
    await fs.access(chapter.chapterFile);
    await fs.unlink(chapter.chapterFile);

    this.successfulResponse({
      res,
      message: MESSAGES.create(updatedChapter.episode),
    });
  }

  async deleteChapter(req: DeleteReq, res: Response) {
    const {
      body: { user },
      params: { id },
    } = req;

    const chapterWithProductManagerId = await DB.getById(id);

    if (chapterWithProductManagerId == null) return;

    if (hasChapterPermission(user, "delete", chapterWithProductManagerId)) {
      return this.forbidden(res);
    }
    const deletedChapter = await DB.delete(id);

    this.successfulResponse({
      res,
      message: MESSAGES.delete(deletedChapter.episode),
    });
  }
}

export default Controller;
