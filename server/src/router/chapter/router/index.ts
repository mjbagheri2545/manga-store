import { Router } from "express";

import multer from "multer";

import SHARED_MESSAGES from "@/constants/messages";
import {
  deleteEntity,
  fileAuthorization,
  fileSizeChecker,
  hasGeneralPermission,
  hasSpecificPermission,
  idAuthorization,
  jwtAuthorization,
} from "@/middlewares";
import { PermissionChapter } from "@/types";
import { getFilePathFromDbFilePath, removeFile } from "@/utils";
import {
  idValidations,
  productIdValidation,
} from "@/validators/chapter_productComment.validator";

import {
  CHAPTER_BASE_SELECT,
  ChapterBase,
  chapterLogger,
  PERMISSION_CHAPTER_SELECT,
} from "../constants/global";
import ChapterController from "../controllers";
import { hasChapterPermission } from "../lib/permissions";
import chapterService, { GetChapterByIdOptions } from "../services";
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

  const { createChapterValidation, updateChapterValidation } =
    new ChapterValidator();

  router.get("/", productIdValidation(), jwtAuthorization, getAllChapters);

  const createGetChapterById = (options?: GetChapterByIdOptions) =>
    idAuthorization({
      entityKey: "chapter",
      getByIdQuery: (id) => chapterService.getById(id, options),
    });

  router.get(
    "/:id",
    idValidations("فصل"),
    jwtAuthorization,
    createGetChapterById({
      select: { ...CHAPTER_BASE_SELECT, translatorId: true },
    }),
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
    hasGeneralPermission((user) => hasChapterPermission(user, "create")),
    chapterFileAuthorization,
    createChapter
  );

  const updatePermission = hasSpecificPermission<PermissionChapter>({
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
    createGetChapterById({
      select: CHAPTER_BASE_SELECT,
    }),
    updatePermission,
    chapterFileAuthorization,
    updateChapter
  );

  function deleteChapterMessage(chapter: ChapterBase) {
    const { delete: deleteMessage } = SHARED_MESSAGES.crud;
    chapterLogger.logMessage("Chapter deleted.", {
      metaData: chapterLoggerData(chapter),
    });

    return deleteMessage("فصل");
  }

  function deleteChapterOperation(chapter: PermissionChapter) {
    return removeFile(
      getFilePathFromDbFilePath(chapter.chapterFile, { isPublic: false })
    );
  }

  const deleteChapter = deleteEntity<ChapterBase, PermissionChapter>({
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
    idValidations("فصل"),
    jwtAuthorization,
    createGetChapterById({
      select: PERMISSION_CHAPTER_SELECT,
    }),
    deleteChapter
  );

  return router;
}

export default createChapterRouter;
