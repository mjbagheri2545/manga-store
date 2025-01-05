import { Router } from "express";

import { Chapter } from "@prisma/client";

import SHARED_MESSAGES from "@/constants/messages";
import {
  allResourcePermission,
  fileAuthorization,
  idAuthorization,
  jwtAuthorization,
  specificResourcePermission,
} from "@/middlewares";
import { deleteEntity } from "@/middlewares/features/crud.middleware";
import { PermissionChapter } from "@/types";
import { createUploader } from "@/utils";
import { slugValidation } from "@/validators";

import chapterLogger from "../constants/logger";
import CHAPTER_MESSAGES from "../constants/message";
import Controller from "../controllers";
import { hasChapterPermission } from "../lib/permissions";
import chapterService from "../services";
import Validator from "../validators";

function createChapterRouter() {
  const router = Router();

  const chapterFileUploader = createUploader(
    "../../../../uploads/chapterFile/"
  );

  const { getAllChaptersOfProduct, sendChapter, createChapter, updateChapter } =
    new Controller();

  const { createChapterValidation, updateChapterValidation } = new Validator();

  router.get(
    "/product/:productId",
    slugValidation("productId", "محصولی با آیدی مورد نظر"),
    jwtAuthorization,
    getAllChaptersOfProduct
  );

  const getChapterById = idAuthorization({
    entityKey: "chapter",
    getByIdQuery: chapterService.getById,
  });

  router.get(
    "/:id",
    slugValidation(),
    jwtAuthorization,
    getChapterById,
    sendChapter
  );

  router.post(
    "/",
    createChapterValidation(),
    jwtAuthorization,
    allResourcePermission((user) => hasChapterPermission(user, "create")),
    chapterFileUploader.single("chapterFile"),
    fileAuthorization([{ name: "PDF", mime: "application/pdf" }]),
    createChapter
  );

  const updatePermission = specificResourcePermission<PermissionChapter>({
    entityKey: "chapter",
    hasPermission: (user, chapter) =>
      hasChapterPermission(user, "update", chapter),
  });

  router.put(
    "/:id",
    updateChapterValidation(),
    jwtAuthorization,
    getChapterById,
    updatePermission,
    chapterFileUploader.single("chapterFile"),
    fileAuthorization([{ name: "PDF", mime: "application/pdf" }]),
    updateChapter
  );

  function deleteChapterMessage(chapter: Chapter) {
    const { delete: deleteMessage } = SHARED_MESSAGES.features.crud;
    chapterLogger.info("Chapter deleted.", chapter);

    return deleteMessage(CHAPTER_MESSAGES.crud(chapter));
  }

  const deleteChapter = deleteEntity<Chapter, PermissionChapter>({
    delete: chapterService.delete,
    entityKey: "chapter",
    hasPermission: (user, chapter) =>
      hasChapterPermission(user, "delete", chapter),
    message: deleteChapterMessage,
  });

  router.delete(
    "/:id",
    slugValidation(),
    jwtAuthorization,
    getChapterById,
    deleteChapter
  );

  return router;
}

export default createChapterRouter;
