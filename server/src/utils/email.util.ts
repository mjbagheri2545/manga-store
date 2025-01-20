import { Response } from "express";

import { createTransport, SendMailOptions, Transporter } from "nodemailer";
import { Address } from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import env from "@/constants/env";
import { emailLogger } from "@/constants/loggers";
import SHARED_MESSAGES from "@/constants/messages";
import STATUS_CODES from "@/constants/statusCodes";
import { sharedUserService } from "@/services";
import { EmptyObject, SendEmailReq, TypeOrTypeArray } from "@/types";

import compileHandlebarsTemplate, {
  CompileHandlebarsTemplateOptions,
} from "./compileHandlebarsTemplate.util";
import { withCatch } from "./error.util";
import {
  getEmailRemainingTime,
  parseTypeOrTypeArray,
  startCase,
} from "./general.util";
import { failedResponse, successfulResponse } from "./response.util";

export type EmailRecipient = string | Address;
export type EmailRecipients = EmailRecipient[];

export type EmailProps<TemplateVariables> = {
  users: TypeOrTypeArray<EmailRecipient>;
  subject: string;
  templateOptions: CompileHandlebarsTemplateOptions;
  templateVariables: TemplateVariables;
};

type MainTemplateVariables = {
  content: string;
  appName: string;
};

type EmailResponse = {
  isSuccessful: boolean;
} & Pick<SMTPTransport.SentMessageInfo, "accepted" | "rejected">;

class Email<TemplateVariables = EmptyObject> {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;
  private subject: string;
  private templateOptions: CompileHandlebarsTemplateOptions;
  private templateVariables: TemplateVariables;
  private recipients: {
    users: EmailRecipients;
    accepted: EmailRecipients;
    rejected: EmailRecipients;
  };
  private tryingTime = 0;
  private html = "";

  constructor({
    users,
    subject = "",
    templateOptions,
    templateVariables,
  }: EmailProps<TemplateVariables>) {
    this.recipients = {
      users: parseTypeOrTypeArray(users),
      accepted: [],
      rejected: [],
    };
    this.subject = subject;
    this.templateOptions = templateOptions;
    this.templateVariables = templateVariables;
    this.transporter = this.createTransporter();
  }

  async send(): Promise<EmailResponse> {
    const mainTemplate = await compileHandlebarsTemplate<MainTemplateVariables>(
      { name: "main" }
    );

    const template = await compileHandlebarsTemplate<
      TemplateVariables & { appName: string }
    >(this.templateOptions);

    const appName = env.APP_NAME;

    const mainTemplateVariables: MainTemplateVariables = {
      appName,
      content: template({ appName, ...this.templateVariables }),
    };

    this.html = mainTemplate(mainTemplateVariables);

    return this.sendEmail(this.recipients.users);
  }

  private async sendEmail(recipients: EmailRecipients): Promise<EmailResponse> {
    const emailOptions: SendMailOptions = {
      from: env.EMAIL_SERVICE_FROM,
      to: recipients,
      subject: startCase(this.subject),
      html: this.html,
    };

    const loggerFunction = (error: Error) => {
      emailLogger.logMessage(error, {
        metaData: {
          retry: this.tryingTime,
          accepted: this.recipients.accepted,
          rejected: this.recipients.rejected,
        },
        level: "error",
      });
    };

    const [error, emailResponse] = await withCatch(
      this.transporter.sendMail(emailOptions),
      loggerFunction
    );

    this.tryingTime += 1;

    if (error != null) {
      const recipientsToSend = this.recipients.users.filter(
        (user) => !this.recipients.accepted.includes(user)
      );

      return this.sendEmail(recipientsToSend);
    }

    this.recipients.accepted = this.recipients.accepted.concat(
      emailResponse.accepted
    );

    this.recipients.rejected = this.recipients.rejected.concat(
      emailResponse.rejected
    );

    const isRetrying =
      emailResponse.accepted.length !== recipients.length &&
      this.tryingTime < 3;

    if (isRetrying) {
      return this.sendEmail(emailResponse.rejected);
    }

    const isSuccessful =
      this.recipients.accepted.length === this.recipients.users.length;

    const data = {
      accepted: this.recipients.accepted,
      rejected: this.recipients.rejected,
    };

    emailLogger.logMessage(
      `email with status: ${isSuccessful ? "successful " : "failed"}`,
      {
        metaData: {
          from: env.EMAIL_SERVICE_FROM,
          recipients: this.recipients.users,
          subject: startCase(this.subject),
          ...data,
        },
        level: isSuccessful ? "info" : "error",
      }
    );

    return { isSuccessful, ...data };
  }

  createTransporter() {
    return createTransport({
      service: env.EMAIL_SERVICE_NAME,
      auth: {
        user: env.EMAIL_SERVICE_USER,
        pass: env.EMAIL_SERVICE_PASS,
      },
    });
  }
}

type SendEmailOptions<T> = {
  subject: string;
  templateVariables: T;
  templateOptions: CompileHandlebarsTemplateOptions;
  isSendResponseNeed?: boolean;
};

export function sendEmail<T>({
  subject,
  isSendResponseNeed = true,
  ...restOptions
}: SendEmailOptions<T>) {
  return async (req: SendEmailReq, res: Response) => {
    const { user, email } = req.body;
    const finalEmail = email ?? user.email;

    const emailSender = new Email({
      subject,
      users: [finalEmail],
      ...restOptions,
    });
    const { isSuccessful } = await emailSender.send();

    if (!isSuccessful && isSendResponseNeed) {
      const { failed: failedMessage } = SHARED_MESSAGES.general.sendEmail;

      return failedResponse({
        res,
        code: STATUS_CODES.internalServerError,
        message: failedMessage,
      });
    }

    const remainingTime = getEmailRemainingTime();
    await sharedUserService.setEmailRemainingTime(finalEmail, remainingTime);

    if (!isSendResponseNeed) return;

    const { successful: successfulMessage } = SHARED_MESSAGES.general.sendEmail;

    successfulResponse({
      res,
      message: successfulMessage(email),
      data: {
        remainingTime,
      },
    });
  };
}
