import { IsNotEmpty, IsNumber, Min, Max } from "class-validator";

export class CreateRatingDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(10)
    rate: number
}