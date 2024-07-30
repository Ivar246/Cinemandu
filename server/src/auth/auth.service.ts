import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(private config: ConfigService, private prisma: PrismaService, private jwt: JwtService) { }
    async signup(signupDto: SignupDto) {
        console.log(signupDto)
        try {
            const user = await this.prisma.user.findUnique({ where: { email: signupDto.email } });
            if (user) throw new ForbiddenException("Credential Taken.");
            const password_hash = await bcrypt.hash(signupDto.password, 10);

            const newUser = await this.prisma.user.create({
                data: {
                    email: signupDto.email,
                    username: signupDto.username,
                    password_hash
                }
            });

            const payload = {
                id: newUser.id,
                email: newUser.email,
                role: newUser.user_role
            };

            const access_token = await this.jwt.signAsync(payload, { secret: this.config.get("ACCESS_SECRET"), expiresIn: '10d' })
            return { access_token: access_token, message: "sign up successfull" };

        }
        catch (error) {
            throw error;
        }
    }

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findFirst({ where: { email: loginDto.email } })
        if (!user) throw new NotFoundException("User with the email doesn't exist");

        const isMatch = await bcrypt.compare(loginDto.password, user.password_hash);
        if (!isMatch) throw new ForbiddenException("Password doesn't match with the email.")

        const payload = {
            id: user.id,
            email: user.email,
            role: user.user_role
        };

        const access_token = await this.jwt.signAsync(payload, { secret: this.config.get("ACCESS_SECRET"), expiresIn: "10d" })

        return { access_token, message: "user logged in successfull" };
    }

}
