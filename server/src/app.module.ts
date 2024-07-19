import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from "@nestjs/config"
import { ArtistModule } from './artist/artist.module';
import { RoleModule } from './role/role.module';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    ArtistModule,
    RoleModule,
    MovieModule,
    GenreModule,
    LoggerModule],
})
export class AppModule { }
