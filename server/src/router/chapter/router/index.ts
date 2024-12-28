import { Router } from "express";

import { createUploader } from "@/utils";

import MESSAGES from "../constants/messages";
import Controller from "../controllers";
import { hasChapterPermission } from "../lib/permissions";
import Validator from "../validators";

function createChapterRouter() {
  const router = Router();

  const chapterFileUploader = createUploader(
    "../../../../uploads/chapterFile/"
  );

  const {
    jwtAuthorization,
    permissionAuthorization,
    fileAuthorization,
    getById,
    getAllChaptersOfProduct,
    createChapter,
    updateChapter,
    deleteChapter,
  } = new Controller();

  const { slugValidation, createChapterValidation, updateChapterValidation } =
    new Validator();

  router.get(
    "/:productId",
    slugValidation("productId", "محصولی با آیدی مورد نظر"),
    jwtAuthorization,
    getAllChaptersOfProduct
  );
  router.get("/:id", slugValidation(), jwtAuthorization, getById);

  router.post(
    "/",
    createChapterValidation(),
    jwtAuthorization,
    permissionAuthorization((user) => hasChapterPermission(user, "create")),
    chapterFileUploader.single("chapterFile"),
    fileAuthorization(["application/pdf"], MESSAGES.invalidChapterFile),
    createChapter
  );

  router.put(
    "/:id",
    updateChapterValidation(),
    jwtAuthorization,
    chapterFileUploader.single("chapterFile"),
    fileAuthorization(["application/pdf"], MESSAGES.invalidChapterFile),
    updateChapter
  );

  router.delete("/:id", slugValidation(), jwtAuthorization, deleteChapter);

  return router;
}

export default createChapterRouter;
