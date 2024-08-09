import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    async create(dto: SignupDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            })

            if (user) {
                throw new HttpException("user already exist", HttpStatus.CONFLICT);
            }
        }
    }

    async findAll() {
        return "finding all user";
    }

    async update() {
        return "updating userss";
    }

    async delete() {
        return "deleting users";
    }
}

