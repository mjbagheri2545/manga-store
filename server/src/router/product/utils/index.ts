import { Request } from "express";

import fs from "fs/promises";
import multer from "multer";
import path from "path";
import { Prisma } from "@prisma/client";

import { paginate, pick, withCatch } from "@/utils";

import { ProductQuery } from "../types";

export function parseQuery(query: ProductQuery): Prisma.ProductFindManyArgs {
  return {
    ...paginate(query),
    orderBy: {
      createdAt: query.sort ?? "desc",
    } as Prisma.ProductFindManyArgs["orderBy"],
  };
}

export function createProductImageUploader() {
  const productImageStorage = multer.diskStorage({
    destination: async (_req, _file, cb) => {
      const uploadPath = path.join(
        __dirname,
        "../../../../uploads/productImage/"
      );

      const [error] = await withCatch(fs.access(uploadPath));
      if (error != null) {
        await fs.mkdir(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (_, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName);
    },
  });

  const productImageUploader = multer({
    storage: productImageStorage,
  });

  return productImageUploader;
}

export function pickProductCreateData(req: Request) {
  return pick(req.body, [
    "name",
    "persianName",
    "writer",
    "designer",
    "priceInRials",
    "releaseYear",
    "slug",
    "summary",
  ]);
}

export function getTagsData(tagsId: string[], productTags: { id: string }[]) {
  const tags = tagsId.sort().map((id) => ({ id }));
  const currentTags = productTags.sort();

  const isSameTags = JSON.stringify(tags) === JSON.stringify(currentTags);

  return isSameTags ? {} : { tags: { set: tags } };
}
