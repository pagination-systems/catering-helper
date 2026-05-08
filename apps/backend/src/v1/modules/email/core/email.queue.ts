import path from "node:path";
import { fileURLToPath } from "node:url";
import sgMail from "@sendgrid/mail";
import type { Job } from "bullmq";
import ejs from "ejs";
import nodemailer from "nodemailer";
import { env } from "../../../../.config/env";
import { logger } from "../../../../common/helper";
import { ReusableQueue } from "../../../../queue/Queue";
import type { EmailConfiguration } from "./email.interface";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

if (env.NODE_ENV === "production") sgMail.setApiKey(env.SEND_GRID_API_KEY!);

const renderTemplate = async (template: string, data: any): Promise<string> => {
  const templatePath = path.join(currentDir, "..", "templates", `${template}.ejs`);

  return ejs.renderFile(templatePath, data);
};

const processEmail = async (job: Job<EmailConfiguration>) => {
  const { template, receiver, sender, subject, payload } = job.data;

  if (!sender) {
    throw new Error("Sender email is required");
  }

  const html = await renderTemplate(template, {
    subject,
    payload,
  });

  if (env.NODE_ENV === "production") {
    await sgMail.send({
      from: {
        name: "Interface NRM",
        email: sender,
      },
      to: receiver,
      subject,
      html,
      trackingSettings: {
        clickTracking: {
          enable: false,
          enableText: false,
        },
        openTracking: {
          enable: true,
        },
      },
      attachments: [],
    });
    return;
  }

  await nodemailer
    .createTransport({
      host: env.EMAIL_HOST,
      port: env.EMAIL_PORT,
      auth: {
        user: env.EMAIL_USERNAME,
        pass: env.EMAIL_PASSWORD,
      },
    })
    .sendMail({
      from: sender,
      to: receiver,
      subject,
      html,
    });
};

export const emailQueue = new ReusableQueue<EmailConfiguration>("emailQueue", processEmail);

logger.info("Email queue initialized");
