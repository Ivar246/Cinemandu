import { IsNotEmpty, IsNumber, Min, Max, IsOptional } from "class-validator";

export class UpdateRatingDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(10)
    rate: number
}