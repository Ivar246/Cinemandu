import { ConflictException, Delete, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {

    constructor(private prisma: PrismaService) { }


    async createRole(roleName: string) {
        try {
            const role = await this.prisma.role.create({
                data: { role_name: roleName },
            });
            return { data: role, message: 'Role created' };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Role already exists');
                }
            }
            if (error.code === 500)
                throw new InternalServerErrorException(error.message);
            return error
        }
    }

    async getAllRoles() {
        try {
            const roles = await this.prisma.role.findMany();

            if (roles.length === 0) throw new NotFoundException("No roles available")

            return { data: roles }
        } catch (error) {
            if (error.code === 500)
                throw new InternalServerErrorException(error.message)
            return error
        }
    }

    async updateRole(roleId: number, roleName: string) {
        try {
            const role = await this.prisma.role.findUnique({ where: { id: roleId } })
            console.log(role)
            if (!role) throw new NotFoundException("Role with the Id not found")
            const updatedRole = await this.prisma.role.update({
                where: { id: roleId },
                data: {
                    role_name: roleName
                }
            });

            return { data: updatedRole, message: `Role with id ${roleId} updated successfully` }
        } catch (error) {
            if (error.code === 500)
                throw new InternalServerErrorException(error.message)
            return error
        }
    }

    async deleteRole(roleId: number) {
        try {
            const role = await this.prisma.role.delete({ where: { id: roleId } });
            return { data: role, message: "Role deleted Successfully" }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError)
                if (error.code === 'P2025')
                    throw new NotFoundException("Role doesn't exist.")
            if (error.code === 500) throw new InternalServerErrorException(error.message)
            return error;
        }
    }

}
