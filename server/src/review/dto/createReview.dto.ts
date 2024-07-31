import { HeaderVersioningOptions } from "@nestjs/common/interfaces"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    heading: string

    @IsString()
    @IsNotEmpty()
    text: string

    @IsNotEmpty()
    @IsNumber()
    movie_id: number
}