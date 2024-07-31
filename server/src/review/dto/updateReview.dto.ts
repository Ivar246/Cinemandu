import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateReviewDto {
    @IsNotEmpty()
    @IsString()
    heading: string

    @IsString()
    @IsNotEmpty()
    text: string
}