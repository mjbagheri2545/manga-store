import { Request, Response } from "express";

import fs from "fs/promises";
import path from "path";

import env from "@/constants/env";
import { forbidden, notFound, withCatch } from "@/utils";

async function servePrivateFiles(
  req: Request<{ fileName: string; fileDate: string; fileType: string }>,
  res: Response
) {
  const referer = req.get("Referer");
  const origin = req.get("Origin");

  if (referer == null && origin == null) {
    return forbidden(res);
  }

  const allowedDomains = [env.CLIENT_END_POINT];
  const isForbidden = !allowedDomains.some(
    (domain) => referer?.startsWith(domain) || origin?.startsWith(domain)
  );

  if (isForbidden) {
    return forbidden(res);
  }

  const { fileName, fileDate, fileType } = req.params;

  const filePath = path.join(
    __dirname,
    "../../private/uploads",
    fileType,
    fileDate,
    fileName
  );

  const [error] = await withCatch(fs.access(filePath));

  if (error != null) {
    return notFound({ res, entityName: "File", entityInfo: "file name" });
  }

  res.sendFile(filePath);
}

export default servePrivateFiles;
