import { Router } from "express";

import multer from "multer";
import { Chapter } from "@prisma/client";

import SHARED_MESSAGES from "@/constants/messages";
import {
  allResourcePermission,
  deleteEntity,
  fileAuthorization,
  idAuthorization,
  jwtAuthorization,
  specificResourcePermission,
} from "@/middlewares";
import { PermissionChapter } from "@/types";
import { slugValidation } from "@/validators";

import chapterLogger from "../constants/logger";
import CHAPTER_MESSAGES from "../constants/messages";
import ChapterController from "../controllers";
import { hasChapterPermission } from "../lib/permissions";
import chapterService from "../services";
import { chapterLoggerData } from "../utils";
import ChapterValidator from "../validators";

// 50 MB
const CHAPTER_FILE_SIZE_LIMIT = 50 * 1024 * 1024;

function createChapterRouter() {
  const router = Router();

  const chapterFileUploader = multer({
    storage: multer.memoryStorage(),
    limits: { files: 1, fileSize: CHAPTER_FILE_SIZE_LIMIT },
  });
  const { getAllChapters, getChapter, createChapter, updateChapter } =
    new ChapterController();

  const { createChapterValidation, updateChapterValidation } =
    new ChapterValidator();

  router.get(
    "/product/:productId",
    slugValidation("productId", "محصولی با آیدی مورد نظر"),
    jwtAuthorization,
    getAllChapters
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
    getChapter
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
    const { delete: deleteMessage } = SHARED_MESSAGES.crud;
    chapterLogger.logMessage("Chapter deleted.", {
      metaData: { chapter: chapterLoggerData(chapter) },
    });

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
