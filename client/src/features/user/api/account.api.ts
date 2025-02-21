import PATH from "@/constants/path";
import { HTTP } from "@/lib/http";

import {
  GetEmailData,
  PasswordRecoveryRecoverData,
  PasswordResetData,
  VerificationData,
} from "../schemas/account.schema";

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
      verify({ verificationCode }: VerificationData) {
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
        getEmail(data: GetEmailData) {
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
