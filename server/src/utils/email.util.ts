import { createTransport, SendMailOptions, Transporter } from "nodemailer";
import { Address } from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import env from "@/constants/env";
import { EmptyObject, TypeOrTypeArray } from "@/types";

import compileHandlebarsTemplate, {
  CompileHandlebarsTemplateOptions,
} from "./compileHandlebarsTemplate.util";
import { parseTypeOrTypeArray, pick, startCase } from "./general.util";

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

export type EmailResponse = {
  isSuccessful: boolean;
} & SMTPTransport.SentMessageInfo;

export class Email<TemplateVariables = EmptyObject> {
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

    const emailResponse = await this.transporter.sendMail(emailOptions);

    this.tryingTime += 1;
    this.recipients.accepted = this.recipients.accepted.concat(
      emailResponse.accepted
    );
    this.recipients.rejected = this.recipients.rejected.concat(
      emailResponse.rejected
    );

    if (
      emailResponse.accepted.length !== recipients.length &&
      this.tryingTime < 3
    ) {
      return await this.sendEmail(emailResponse.rejected);
    } else {
      return {
        isSuccessful:
          this.recipients.rejected.length === this.recipients.users.length
            ? false
            : true,
        accepted: this.recipients.accepted,
        rejected: this.recipients.rejected,
        ...pick(emailResponse, [
          "messageId",
          "envelope",
          "pending",
          "response",
        ]),
      };
    }
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
