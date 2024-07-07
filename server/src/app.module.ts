import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from "@nestjs/config"
import { ArtistModule } from './artist/artist.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    AuthModule, PrismaModule, ArtistModule, RoleModule],
})
export class AppModule { }
