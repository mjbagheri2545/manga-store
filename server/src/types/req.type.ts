import { Request } from "express";

import { User } from "@prisma/client";

import { EmptyObject } from "./common.type";

export type Req<Body = any, Query = any, Params = any> = Request<
  Params,
  any,
  Body,
  Query
>;

export type UserAuthorizedReq<
  Body = EmptyObject,
  Query = EmptyObject,
  Params = EmptyObject,
> = Req<
  {
    user: User;
  } & Body,
  Query,
  Params
>;

export type SendEmail<Body = EmptyObject> = UserAuthorizedReq<
  Body,
  GetEmailQuery
>;

export type EmailType = "resendEmail" | "getRemainingTime" | undefined;
export type GetEmailQuery = Partial<{
  path: string;
  emailType: EmailType;
}>;

export type IdentityVerification<Body = EmptyObject> = UserAuthorizedReq<
  Body,
  EmptyObject,
  { verificationCode?: string }
>;
