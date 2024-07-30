import { IsNotEmpty, IsNumber, } from "class-validator";

export class CreateWatchlistDto {
    @IsNotEmpty()
    @IsNumber()
    movie_id: number
}
