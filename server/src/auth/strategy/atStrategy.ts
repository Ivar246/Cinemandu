import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, "access") {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("ACCESS_SECRET"),
        });
    }

    async validate(payload: any) {
        const currentUser = await this.prisma.user.findUnique({
            where: {
                email: payload.email
            },
        });

        delete currentUser['password_hash'];
        console.log(currentUser);
        return currentUser;

    }
}