import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenreDto {

    @IsString()
    @IsNotEmpty()
    genre_name: string
}