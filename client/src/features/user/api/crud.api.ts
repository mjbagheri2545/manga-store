import PATH from "@/constants/path";
import { HTTP } from "@/lib/http";
import { User, WithOnUploadProgress } from "@/types";
import { CrudApi } from "@/utils";

import { CreateUserData } from "../schemas/crud.schema";

export type GetAllUserBase = Pick<
  User,
  | "id"
  | "email"
  | "createdAt"
  | "fullName"
  | "walletBalanceInToman"
  | "isVerified"
>;

type GetAllUserResponse = {
  users: GetAllUserBase[];
};

export type GetUserByIdResponse = {
  user: User;
};

type CreateUserOptions = WithOnUploadProgress & {
  data: CreateUserData;
};

type UpdateUserOptions = WithOnUploadProgress & {
  id: string;
  data: Partial<CreateUserData>;
};

class UserCrudApi extends CrudApi<
  GetAllUserResponse,
  GetUserByIdResponse,
  CreateUserData
> {
  constructor() {
    super(PATH.base.user);
  }

  override create({ data, onUploadProgress }: CreateUserOptions) {
    return HTTP.post<{ id: string }>(PATH.base.user, {
      data,
      onUploadProgress,
      headers: { "Content-Type": "multipart/form-data" },
      timeout: Number.POSITIVE_INFINITY,
    });
  }

  override update({ id, data, onUploadProgress }: UpdateUserOptions) {
    return HTTP.put<{ id: string }>(`${PATH.base.user}/${id}`, {
      data,
      onUploadProgress,
      headers: { "Content-Type": "multipart/form-data" },
      timeout: Number.POSITIVE_INFINITY,
    });
  }
}

const userCrudApi = new UserCrudApi();

export default userCrudApi;
