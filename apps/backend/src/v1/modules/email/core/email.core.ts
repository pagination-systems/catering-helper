import Joi from "joi";
import { EmailMissConfigException, validate } from "../../../../common/helper";
import type { EmailOptions, EmailTemplateNames } from "./email.interface";
import { emailQueue } from "./email.queue.js";

export class Email {
  private receiver: string | undefined;
  private payload: any; // Define a more specific type for payload if needed
  private sender: string;
  private subject: string;
  private template: EmailTemplateNames;
  private scheduleDate: Date | undefined;

  constructor({ template, subject, payload }: EmailOptions) {
    this.template = template;
    this.subject = subject;
    this.payload = payload;
    this.sender = process.env.EMAIL_SENDER || "default@example.com";
  }

  public to(receiver: string) {
    this.receiver = receiver;
    return this;
  }
  public withAttachments(_attachments: any[]) {
    return this;
  }
  public schedule(date: Date) {
    this.scheduleDate = new Date(date);
    return this;
  }

  public send() {
    const receiver = this.receiver;
    const errors = validate(Joi.string().email(), receiver);
    if (errors) throw new EmailMissConfigException(`Invalid receiver email configured: ${this.receiver}`);

    if (!receiver) {
      throw new EmailMissConfigException(`Invalid receiver email configured: ${this.receiver}`);
    }

    const sender = this.sender;
    const now = new Date();
    if (this.scheduleDate && this.scheduleDate < now) {
      throw new EmailMissConfigException("Scheduled date cannot be in the past.");
    }
    const delay = this.scheduleDate ? this.scheduleDate.getTime() - now.getTime() : 0;

    emailQueue.addJob(
      "send-email",
      {
        receiver,
        sender,
        subject: this.subject,
        template: this.template,
        payload: this.payload,
      },
      {
        delay,
      },
    );
    return this;
  }
}
