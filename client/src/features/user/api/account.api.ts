import { z } from "zod";

import PATH from "@/constants/path";
import { HTTP } from "@/lib/http";

import USER_ACCOUNT_SCHEMA from "../schema/account.schema";

export type AccountVerificationVerifyData = z.infer<
  typeof USER_ACCOUNT_SCHEMA.verification.verify
>;

export type PasswordRecoveryGetEmailData = z.infer<
  typeof USER_ACCOUNT_SCHEMA.password.recovery.getEmail
>;
export type PasswordRecoveryRecoverData = z.infer<
  typeof USER_ACCOUNT_SCHEMA.password.recovery.recover
> & {
  email: string;
};

export type PasswordResetData = z.infer<
  typeof USER_ACCOUNT_SCHEMA.password.reset
>;

class UserAccountApi {
  readonly password;
  readonly verification;

  constructor() {
    this.verification = this.createVerificationApi();
    this.password = this.createPasswordApi();
  }

  private createVerificationApi() {
    const { verification: verificationPath } = PATH.user.account;

    return {
      getEmail() {
        return HTTP.post(
          PATH.user.getFullPath(`${verificationPath}/get-email`)
        );
      },
      verify({ verificationCode }: AccountVerificationVerifyData) {
        return HTTP.put(
          PATH.user.getFullPath(`${verificationPath}/${verificationCode}`)
        );
      },
    };
  }

  private createPasswordApi() {
    const { password: passwordPath } = PATH.user.account;

    return {
      recovery: {
        getEmail(data: PasswordRecoveryGetEmailData) {
          return HTTP.post(
            PATH.user.getFullPath(`${passwordPath.recovery}/get-email`),
            {
              data,
            }
          );
        },

        recover({
          verificationCode,
          ...restData
        }: PasswordRecoveryRecoverData) {
          return HTTP.put(
            PATH.user.getFullPath(
              `${passwordPath.recovery}/${verificationCode}`
            ),
            {
              data: restData,
            }
          );
        },
      },

      reset(data: PasswordResetData) {
        return HTTP.put(passwordPath.reset, { data });
      },
    };
  }
}

const userAccountApi = new UserAccountApi();

export default userAccountApi;
