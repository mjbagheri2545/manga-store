import { Request, Response } from "express";

import autoBind from "auto-bind";

import { ENTITY_NAMES } from "@/constants/global/general.global";
import SHARED_MESSAGES from "@/constants/messages";
import PRODUCT_GROUP_MESSAGES from "@/constants/messages/features/productGroup.message";
import {
  IProductGroupModelService,
  ProductGroupModel,
  ProductGroupModelEntityKey,
  UserAuthorizedReq,
} from "@/types";
import {
  badRequest,
  CustomLogger,
  successfulResponse,
  upperFirst,
} from "@/utils";

type CreateEntityReqBody = {
  slug: string;
  name: string;
};

type CreateEntityReq = UserAuthorizedReq<CreateEntityReqBody>;

export type ProductGroupModelControllerOptions<T extends ProductGroupModel> = {
  entityKey: ProductGroupModelEntityKey;
  service: IProductGroupModelService<T>;
  logger: CustomLogger;
};

class ProductGroupModelController<T extends ProductGroupModel> {
  private entityName;
  private service;
  private entityKey;
  private logger;

  constructor({
    entityKey,
    service,
    logger,
  }: ProductGroupModelControllerOptions<T>) {
    autoBind(this);
    this.entityName = ENTITY_NAMES[entityKey];
    this.entityKey = entityKey;
    this.service = service;
    this.logger = logger;
  }

  getEntity(req: Request, res: Response) {
    successfulResponse({
      res,
      data: { [this.entityKey]: req.body[this.entityKey] },
    });
  }

  async createEntity(req: CreateEntityReq, res: Response) {
    const { name, slug } = req.body;

    const existingEntity = await this.service.uniquenessCheck({ name, slug });

    if (existingEntity != null) {
      return badRequest(res, {
        message: PRODUCT_GROUP_MESSAGES.alreadyExists(this.entityName),
      });
    }

    const entity = await this.service.create({ name, slug });

    this.logger.logMessage(`${upperFirst(this.entityKey)} created.`, {
      metaData: entity,
    });

    const { create: createMessage } = SHARED_MESSAGES.crud;

    const message = createMessage(
      PRODUCT_GROUP_MESSAGES.crud(entity, this.entityName)
    );

    successfulResponse({ res, message, data: { id: entity.id } });
  }

  async updateEntity(req: Request, res: Response) {
    const { name, slug, [this.entityKey]: entity } = req.body;

    if (name == null && slug == null) {
      const { noFieldUpdated: noFieldUpdatedMessage } = SHARED_MESSAGES.crud;

      return badRequest(res, {
        message: noFieldUpdatedMessage,
        isFullMessage: true,
      });
    }

    const existingEntity = await this.service.uniquenessCheck({ name, slug });

    if (existingEntity != null) {
      return badRequest(res, {
        message: PRODUCT_GROUP_MESSAGES.alreadyExists(this.entityName),
        isFullMessage: true,
      });
    }

    const updatedEntity = await this.service.update(entity.id, { name, slug });

    this.logger.logMessage(`${upperFirst(this.entityKey)} updated.`, {
      metaData: {
        old: entity,
        new: updatedEntity,
      },
    });

    const { update: updateMessage } = SHARED_MESSAGES.crud;

    const message = updateMessage(
      PRODUCT_GROUP_MESSAGES.crud(updatedEntity, this.entityName)
    );

    successfulResponse({
      res,
      message,
      data: { id: updatedEntity.id },
    });
  }
}

export default ProductGroupModelController;
