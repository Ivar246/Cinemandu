import { Controller, Param, Body, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
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

    updateRole() {

    }

    deleteRole() {

    }
}
