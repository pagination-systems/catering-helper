import path from "node:path";
import { fileURLToPath } from "node:url";
import sgMail from "@sendgrid/mail";
import type { Job } from "bullmq";
import ejs from "ejs";
import nodemailer from "nodemailer";
import { logger } from "../../../../common/helper";
import { ReusableQueue } from "../../../../queue/Queue";
import type { EmailConfiguration } from "./email.interface";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "production") sgMail.setApiKey(process.env.SEND_GRID_API_KEY!);

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

  if (process.env.NODE_ENV === "production") {
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
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
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
