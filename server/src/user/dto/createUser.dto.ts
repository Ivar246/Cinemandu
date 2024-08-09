import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    username: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string
}