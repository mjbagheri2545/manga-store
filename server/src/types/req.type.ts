import { Request } from "express";

import { User } from "@prisma/client";

import { EmptyObject } from "./general.type";

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

export type SendEmailReq<Body = { email?: string }> = UserAuthorizedReq<Body>;

export type IdentityVerificationReq<Body = EmptyObject> = UserAuthorizedReq<
  Body,
  EmptyObject,
  { verificationCode: string }
>;

export type PaginateQuery = {
  take?: string;
  skip?: string;
};

export type PaginateQueryWithSort = PaginateQuery & {
  sort?: string;
};
