import { ConflictException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {

    constructor(private prisma: PrismaService) { }


    async createRole(roleName: string) {
        try {
            const role = await this.prisma.role.create({
                data: { name: roleName },
            });
            console.log(role)
            return { data: role, message: 'Role created' };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Role already exists');
                }
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async getRoles() {

    }

    async updateRole() {

    }

    async deleteRole() {

    }

}
