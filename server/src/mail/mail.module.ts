import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from "@nestjs-modules/mailer"
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.example.com',
        secure: false,
        auth: {
          user: 'user@example.com',
          pass: 'topsecret'
        }
      },
      defaults: {
        from: '"no Reply " <noreply@example.com>',
      }
    }),
    template: {
      dir: join(__dirname, "templates"),
      adapter: new HandlebarsAdapter()
    }
  ],
  providers: [MailService]
})
export class MailModule { }
