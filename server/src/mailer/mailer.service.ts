import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from "nodemailer";
import fs from "node:fs/promises";

@Injectable()
export class MailerService {

    private readonly transporter: nodemailer.Transporter;

    constructor(private readonly config: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: 'live.smtp.mailtrap.io',
            port: 587,
            secure: false,
            auth: {
                user: 'e8ca4d78655964',
                pass: '1857366307ab80',
            }
        });

    }

    async sendMail({
        templatePath,
        context,
        ...mailOptions
    }: nodemailer.SendMailOptions & {
        templatePath: string,
        context: Record<string, unknown>
    }): Promise<void> {
        let html: string | undefined;
        if (templatePath) {
            const template = await fs.readFile(templatePath, "utf-8");
            html = Handlebars.compile(template, { strict: true })(context);
        }

        await this.transporter.sendMail({
            ...mailOptions,
            from: mailOptions.from,
            html: mailOptions.html
        })
    }

}
