import { NextFunction, Request, Response } from "express";

import sharedUserService from "@/services/user.service";
import { notFound } from "@/utils";

export async function emailAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  const user = await sharedUserService.getByEmail(email);

  if (user == null) {
    return notFound({ res, entityName: "کاربری", entityInfo: "ایمیل" });
  }

  req.body.user = user;
  next();
}
