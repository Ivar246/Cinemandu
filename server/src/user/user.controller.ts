import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post("/create")
    create() {
        return this.userService.create();
    }

    @Get("/users")
    findAll() {
        return this.userService.findAll();
    }

    @Put("/update/:id")
    update() {
        return this.userService.update();
    }

    @Delete("/delete")
    delete() {
        return this.userService.delete();
    }
}
