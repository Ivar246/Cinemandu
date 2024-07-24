import { Controller, Param, Body, Post, HttpCode, HttpStatus, Get, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { AddRoleDto } from './dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';

@ApiTags("roles")
@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService) { }
    @HttpCode(HttpStatus.CREATED)
    @Post("/create")
    @ApiOperation({ summary: 'create new role' })
    @ApiResponse({ status: 201, description: 'New role created successfully.' })
    createRole(@Body() addRoleDto: AddRoleDto) {
        return this.roleService.createRole(addRoleDto.name);
    }

    @HttpCode(HttpStatus.OK)
    @Get("/getAllRoles")
    @ApiOperation({ summary: 'fetching all roles' })
    @ApiResponse({ status: 200, description: 'roles fetched successfully.' })
    getAllRoles() {
        return this.roleService.getAllRoles();
    }

    @HttpCode(HttpStatus.OK)
    @Put("/update/:id")
    @ApiOperation({ summary: 'update role by id' })
    @ApiResponse({ status: 200, description: 'role updated successfully.' })
    updateRole(@Param("id", ParseIntPipe) roleId: number,
        @Body("name") roleName: string) {
        return this.roleService.updateRole(roleId, roleName)
    }

    @HttpCode(HttpStatus.OK)
    @Delete("/delete/:id")
    @ApiOperation({ summary: 'delete role by id' })
    @ApiResponse({ status: 200, description: 'role deleted successfully.' })
    deleteRole(@Param('id', ParseIntPipe) roleId: number) {
        return this.roleService.deleteRole(roleId)
    }
}
