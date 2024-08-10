import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailData } from './interfaces';
import path from 'path';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }


    async confirmEmail(mailData: MailData<{ hash: string }>): Promise<void> {
        const url = new URL("http://localhost:3000/confirm/email");
        url.searchParams.set('hash', mailData.data.hash)
        await this.mailerService.sendMail({
            to: mailData.to,
            subject: "confirm email",
            text: `${url.toString()} confirm email`,


        })
    }

}
