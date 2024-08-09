import { Transform } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional, IsString, IsInt, IsNumber } from "class-validator"

export class UpdateArtistDto {
    @IsString()
    @IsOptional()
    artist_name: string

    @IsDate()
    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : value)
    DOB: Date

    @IsString()
    @IsOptional()
    profile_url: string

    @IsString()
    @IsOptional()
    profile_summary: string

    @IsOptional()
    @IsInt({ each: true })
    roleIds: number[]

    @IsNumber()
    @IsOptional()
    height: number
}