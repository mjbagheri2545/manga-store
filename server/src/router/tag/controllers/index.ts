import { Response } from "express";

import { Prisma } from "@prisma/client";

import ControllerConfiguration from "@/controllers/configuration.controller";
import { EmptyObject, IdReq, UserAuthorizedReq } from "@/types";

import MESSAGES from "../constants/messages";
import DB from "../db";
import { hasTagPermission } from "../lib/permissions";

type CreateReqBody = {
  slug: string;
  name: string;
};

type CreateReq = UserAuthorizedReq<CreateReqBody>;

type UpdateReq = UserAuthorizedReq<
  Partial<CreateReqBody>,
  EmptyObject,
  { id: string }
>;

class Controller extends ControllerConfiguration {
  async getAll(_req: UserAuthorizedReq, res: Response) {
    const tags = await DB.getAll();

    this.successfulResponse({ res, data: { tags } });
  }

  async createTag(req: CreateReq, res: Response) {
    const { name, slug } = req.body;

    await DB.create({ name, slug });

    this.successfulResponse({ res, message: MESSAGES.create(name) });
  }

  async updateTag(req: UpdateReq, res: Response) {
    const { id } = req.params;
    const tag = await DB.getById(id);

    if (tag == null) return;

    const { user } = req.body;

    if (!hasTagPermission(user, "update", tag)) {
      return this.forbidden(res);
    }

    const { name, slug } = req.body;

    const data: Prisma.TagUpdateInput = {
      name,
      slug,
    };

    const updatedTag = await DB.update(tag.id, data);

    this.successfulResponse({
      res,
      message: MESSAGES.create(updatedTag.name),
    });
  }

  async deleteTag(req: IdReq, res: Response) {
    const {
      body: { user },
      params: { id },
    } = req;

    const tag = await DB.getById(id);

    if (tag == null) return;

    if (hasTagPermission(user, "delete", tag)) {
      return this.forbidden(res);
    }

    const deletedTag = await DB.delete(id);

    this.successfulResponse({
      res,
      message: MESSAGES.delete(deletedTag.name),
    });
  }
}

export default Controller;
