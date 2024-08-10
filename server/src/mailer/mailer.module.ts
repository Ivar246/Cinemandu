import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailService } from 'src/mail/mail.service';


@Module({
  providers: [MailerService],
  exports: [MailService]
})
export class MailerModule {

}
