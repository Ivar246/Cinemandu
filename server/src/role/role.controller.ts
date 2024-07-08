import { Controller, Param, Body, Post, HttpCode, HttpStatus, Get, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { AddRoleDto } from './dto';

@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService) { }
    @HttpCode(HttpStatus.CREATED)
    @Post("/create")
    createRole(@Body() addRoleDto: AddRoleDto) {
        return this.roleService.createRole(addRoleDto.name);
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

    @HttpCode(HttpStatus.OK)
    @Delete("/delete/:id")
    deleteRole(@Param('id', ParseIntPipe) roleId: number) {
        return this.roleService.deleteRole(roleId)
    }
}
