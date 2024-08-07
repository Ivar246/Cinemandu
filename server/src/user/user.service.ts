import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    async create() {
        return "create user";
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

