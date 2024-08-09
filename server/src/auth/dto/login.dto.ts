import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsEmail } from "class-validator"

export class LoginDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}