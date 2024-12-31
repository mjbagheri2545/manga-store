import { Response } from "express";

import { Prisma } from "@prisma/client";

import { hasGroupingModelPermission } from "@/lib/groupingModelPermissions";
import { EmptyObject, GroupingModels, UserAuthorizedReq } from "@/types";

import ControllerConfiguration from "./configuration.controller";

type CreateEntityReqBody = {
  slug: string;
  name: string;
};

type CreateEntityReq = UserAuthorizedReq<CreateEntityReqBody>;

type UpdateEntityReq = UserAuthorizedReq<
  Partial<CreateEntityReqBody>,
  EmptyObject,
  { id: string }
>;

type DeleteEntityReq = UserAuthorizedReq<
  EmptyObject,
  EmptyObject,
  { id: string }
>;

type TDb<T extends GroupingModels> = {
  getAll: () => Prisma.PrismaPromise<T[]>;
  getById: (id: string) => Prisma.PrismaPromise<T | null>;
  create: (data: Prisma.TagCreateInput) => Prisma.PrismaPromise<T>;
  update: (id: string, data?: Prisma.TagUpdateInput) => Prisma.PrismaPromise<T>;
  delete: (id: string) => Prisma.PrismaPromise<T>;
};

type EntityName = "ژانر" | "دسته بندی" | "وضعیت محصول";

export type GroupingModelsControllerProps<T extends GroupingModels> = {
  entityName: EntityName;
  entitiesKey: string;
  DB: TDb<T>;
};

class GroupingModelsController<
  T extends GroupingModels,
> extends ControllerConfiguration {
  private entityName;
  private DB;
  private entitiesKey;

  constructor({
    entityName,
    entitiesKey,
    DB,
  }: GroupingModelsControllerProps<T>) {
    super();
    this.entityName = entityName;
    this.entitiesKey = entitiesKey;
    this.DB = DB;
  }

  async getAll(_req: UserAuthorizedReq, res: Response) {
    const entities = await this.DB.getAll();

    this.successfulResponse({ res, data: { [this.entitiesKey]: entities } });
  }

  async createEntity(req: CreateEntityReq, res: Response) {
    const { name, slug } = req.body;

    await this.DB.create({ name, slug });

    const { create: createMessage } = this.SHARED_MESSAGES.features.crud;

    this.successfulResponse({
      res,
      message: createMessage(`${this.entityName} ${name}`),
    });
  }

  async updateEntity(req: UpdateEntityReq, res: Response) {
    const { id } = req.params;
    const tag = await this.DB.getById(id);

    if (tag == null) return;

    const { user } = req.body;

    if (hasGroupingModelPermission(user, "update", tag)) {
      return this.forbidden(res);
    }

    const { name, slug } = req.body;

    const updatedTag = await this.DB.update(tag.id, { name, slug });

    const { update: updateMessage } = this.SHARED_MESSAGES.features.crud;

    this.successfulResponse({
      res,
      message: updateMessage(`${this.entityName} ${updatedTag.name}`),
    });
  }

  async deleteEntity(req: DeleteEntityReq, res: Response) {
    const {
      body: { user },
      params: { id },
    } = req;

    const entity = await this.DB.getById(id);

    if (entity == null) {
      return this.notFound({ res, entityName: this.entityName });
    }

    if (hasGroupingModelPermission(user, "delete", entity)) {
      return this.forbidden(res);
    }

    const deletedTag = await this.DB.delete(id);

    const { delete: deleteMessage } = this.SHARED_MESSAGES.features.crud;

    this.successfulResponse({
      res,
      message: deleteMessage(`${this.entityName} ${deletedTag.name}`),
    });
  }
}

export default GroupingModelsController;
