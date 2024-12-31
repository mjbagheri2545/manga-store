import { Router } from "express";

import { createUploader } from "@/utils";

import Controller from "../controllers";
import DB from "../db";
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
  router.get(
    "/:id",
    slugValidation(),
    jwtAuthorization,
    getById({
      entityKey: "chapter",
      entityName: "فصلی",
      getByIdQuery: DB.getById,
    })
  );

  router.post(
    "/",
    createChapterValidation(),
    jwtAuthorization,
    getById({
      entityKey: "chapter",
      entityName: "فصلی",
      getByIdQuery: DB.getById,
    }),
    permissionAuthorization((user) => hasChapterPermission(user, "create")),
    chapterFileUploader.single("chapterFile"),
    fileAuthorization([{ name: "PDF", mime: "application/pdf" }]),
    createChapter
  );

  router.put(
    "/:id",
    updateChapterValidation(),
    jwtAuthorization,
    getById({
      entityKey: "chapter",
      entityName: "فصلی",
      getByIdQuery: DB.getById,
    }),
    chapterFileUploader.single("chapterFile"),
    fileAuthorization([{ name: "PDF", mime: "application/pdf" }]),
    updateChapter
  );

  router.delete("/:id", slugValidation(), jwtAuthorization, deleteChapter);

  return router;
}

export default createChapterRouter;
