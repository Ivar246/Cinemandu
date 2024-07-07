import { Controller, Param, Body, Post, HttpCode, HttpStatus, Get, Put, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService) { }
    @HttpCode(HttpStatus.CREATED)
    @Post("/create")
    createRole(@Body("name") roleName: string) {
        return this.roleService.createRole(roleName);
    }

    @HttpCode(HttpStatus.OK)
    @Get("/getAllRoles")
    getAllRoles() {
        return this.roleService.getAllRoles();
    }

    @HttpCode(HttpStatus.OK)
    @Put("/update/:id")
    updateRole(@Param("id", ParseIntPipe) roleId: number,
        @Body("name") roleName: string) {
        return this.roleService.updateRole(roleId, roleName)
    }

    deleteRole() {

    }
}
