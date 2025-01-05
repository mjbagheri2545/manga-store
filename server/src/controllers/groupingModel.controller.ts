import { Request, Response } from "express";

import winston from "winston";

import { ENTITY_NAMES } from "@/constants/entities";
import SHARED_MESSAGES from "@/constants/messages";
import {
  GroupingModels,
  GroupingModelsEntityKey,
  GroupingModelsService,
  UserAuthorizedReq,
} from "@/types";
import { successfulResponse } from "@/utils";

type CreateEntityReqBody = {
  slug: string;
  name: string;
};

type CreateEntityReq = UserAuthorizedReq<CreateEntityReqBody>;

function getPluralName(key: GroupingModelsEntityKey) {
  switch (key) {
    case "category":
      return "categories";

    case "productStatus":
      return "productStatuses";

    default:
      return "tags";
  }
}

export type GroupingModelsControllerOptions<T extends GroupingModels> = {
  entityKey: GroupingModelsEntityKey;
  service: GroupingModelsService<T>;
  logger: winston.Logger;
};

class GroupingModelsController<T extends GroupingModels> {
  private entityName;
  private service;
  private entityKey;
  private logger;

  constructor({
    entityKey,
    service,
    logger,
  }: GroupingModelsControllerOptions<T>) {
    this.entityName = ENTITY_NAMES[entityKey];
    this.entityKey = entityKey;
    this.service = service;
    this.logger = logger;
  }

  async getAll(_req: UserAuthorizedReq, res: Response) {
    const entities = await this.service.getAll();

    const entitiesKey = getPluralName(this.entityKey);

    successfulResponse({ res, data: { [entitiesKey]: entities } });
  }

  async createEntity(req: CreateEntityReq, res: Response) {
    const { name, slug } = req.body;

    const entity = await this.service.create({ name, slug });

    this.logger.info(`${this.entityKey} created.`, entity);

    const { crud: crudMessage, groupingModel: groupingModelMessage } =
      SHARED_MESSAGES.features;

    const message = crudMessage.create(
      groupingModelMessage.crud(entity, this.entityName)
    );

    successfulResponse({ res, message });
  }

  async updateEntity(req: Request, res: Response) {
    const { name, slug, [this.entityKey]: entity } = req.body;

    const updatedEntity = await this.service.update(entity.id, { name, slug });

    this.logger.info(`${this.entityKey} updated.`, entity);

    const { crud: crudMessage, groupingModel: groupingModelMessage } =
      SHARED_MESSAGES.features;

    const message = crudMessage.update(
      groupingModelMessage.crud(updatedEntity, this.entityName)
    );

    successfulResponse({ res, message });
  }
}

export default GroupingModelsController;
