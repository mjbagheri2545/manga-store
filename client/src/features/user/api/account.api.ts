import { z } from "zod";

import ApiConfiguration from "@/api/configuration.api";

import SCHEMA from "../schema";

export type VerificationVerifyData = z.infer<typeof SCHEMA.verification.verify>;

export type PasswordRecoveryGetEmailData = z.infer<
  typeof SCHEMA.password.recovery.getEmail
>;
export type PasswordRecoveryRecoverData = z.infer<
  typeof SCHEMA.password.recovery.recover
> & {
  email: string;
};

export type PasswordResetData = z.infer<typeof SCHEMA.password.reset>;

class AccountApi extends ApiConfiguration {
  readonly password;
  readonly verification;

  constructor() {
    super();
    this.verification = this.createVerificationApi();
    this.password = this.createPasswordApi();
  }

  private createVerificationApi() {
    const {
      HTTP,
      PATH: {
        user: {
          account: { verification },
        },
      },
    } = this;

    return {
      getEmail() {
        return HTTP.post(verification.getEmail);
      },
      verify({ verificationCode }: VerificationVerifyData) {
        return HTTP.put(`${verification.verify}/${verificationCode}`);
      },
    };
  }

  private createPasswordApi() {
    const {
      HTTP,
      PATH: {
        user: {
          account: { password },
        },
      },
    } = this;

    return {
      recovery: {
        getEmail(data: PasswordRecoveryGetEmailData) {
          return HTTP.post(password.recovery.getEmail, { data });
        },
        recover({
          verificationCode,
          ...restData
        }: PasswordRecoveryRecoverData) {
          return HTTP.put(`${password.recovery.recover}/${verificationCode}`, {
            data: restData,
          });
        },
      },
      reset(data: PasswordResetData) {
        return HTTP.put(password.reset, { data });
      },
    };
  }
}

export default AccountApi;
