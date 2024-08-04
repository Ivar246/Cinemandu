import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from "nodemailer";


@Injectable()
export class MailerService {

    private readonly transporter: nodemailer.Transporter;

    constructor(private readonly config: ConfigService) {
        this.transporter = nodemailer.createTransport({

        })
    }

    async sendMail() {

    }

}
