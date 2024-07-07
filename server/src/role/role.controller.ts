import { Controller, Param, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService) { }
    @HttpCode(HttpStatus.CREATED)
    @Post("/create")
    createRole(@Body("name") roleName: string) {
        return this.roleService.createRole(roleName);
    }

    getRoles() {

    }

    updateRole() {

    }

    deleteRole() {

    }
}
