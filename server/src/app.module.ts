import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from "@nestjs/config"
import { ArtistModule } from './artist/artist.module';
import { RoleModule } from './role/role.module';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';
import { LoggerModule } from './logger/logger.module';
import { RatingModule } from './rating/rating.module';
import { ThrottlerModule } from "@nestjs/throttler"

@Module({
  imports: [ThrottlerModule.forRoot([{
    ttl: 60000,
    limit: 10
  }]),
  ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    ArtistModule,
    RoleModule,
    MovieModule,
    GenreModule,
    LoggerModule,
    RatingModule],
  providers: [
    {

    }
  ]
},
)
export class AppModule { }
