import { Router } from "express";

import multer from "multer";
import { Chapter } from "@prisma/client";

import SHARED_MESSAGES from "@/constants/messages";
import {
  allResourcePermission,
  deleteEntity,
  fileAuthorization,
  fileSizeChecker,
  idAuthorization,
  jwtAuthorization,
  specificResourcePermission,
} from "@/middlewares";
import { PermissionChapter } from "@/types";
import { getFilePathFromDbFilePath, removeFile } from "@/utils";
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
  const router = Router({ mergeParams: true });

  const chapterFileUploader = multer({
    storage: multer.memoryStorage(),
    limits: { files: 1, fileSize: CHAPTER_FILE_SIZE_LIMIT },
  });
  const { getAllChapters, getChapter, createChapter, updateChapter } =
    new ChapterController();

  const { createChapterValidation, updateChapterValidation, idValidation } =
    new ChapterValidator();

  router.get(
    "/",
    slugValidation("productId", "آیدی محصول"),
    jwtAuthorization,
    getAllChapters
  );

  const getChapterById = idAuthorization({
    entityKey: "chapter",
    getByIdQuery: chapterService.getById,
  });

  router.get(
    "/:id",
    idValidation(),
    jwtAuthorization,
    getChapterById,
    getChapter
  );

  const chapterFileAuthorization = fileAuthorization({
    mimeChecker: (mime) => mime.startsWith("application/pdf"),
    invalidMessage: SHARED_MESSAGES.general.invalidFileType("PDF"),
  });

  router.post(
    "/",
    chapterFileUploader.single("chapterFile"),
    fileSizeChecker(CHAPTER_FILE_SIZE_LIMIT, "MB"),
    createChapterValidation(),
    jwtAuthorization,
    allResourcePermission((user) => hasChapterPermission(user, "create")),
    chapterFileAuthorization,
    createChapter
  );

  const updatePermission = specificResourcePermission<PermissionChapter>({
    entityKey: "chapter",
    hasPermission: (user, chapter) =>
      hasChapterPermission(user, "update", chapter),
  });

  router.put(
    "/:id",
    chapterFileUploader.single("chapterFile"),
    fileSizeChecker(CHAPTER_FILE_SIZE_LIMIT, "MB"),
    updateChapterValidation(),
    jwtAuthorization,
    getChapterById,
    updatePermission,
    chapterFileAuthorization,
    updateChapter
  );

  function deleteChapterMessage(chapter: Chapter) {
    const { delete: deleteMessage } = SHARED_MESSAGES.crud;
    chapterLogger.logMessage("Chapter deleted.", {
      metaData: { chapter: chapterLoggerData(chapter) },
    });

    return deleteMessage(CHAPTER_MESSAGES.crud(chapter));
  }

  function deleteChapterOperation(chapter: Chapter) {
    return removeFile(
      getFilePathFromDbFilePath(chapter.chapterFile, { isPublic: false })
    );
  }

  const deleteChapter = deleteEntity<Chapter, PermissionChapter>({
    delete: chapterService.delete,
    operation: deleteChapterOperation,
    failedOperationMessage: "حذف فصل",
    entityKey: "chapter",
    hasPermission: (user, chapter) =>
      hasChapterPermission(user, "delete", chapter),
    message: deleteChapterMessage,
  });

  router.delete(
    "/:id",
    idValidation(),
    jwtAuthorization,
    getChapterById,
    deleteChapter
  );

  return router;
}

export default createChapterRouter;
