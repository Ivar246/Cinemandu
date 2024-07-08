import { Transform } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional, IsString, IsInt } from "class-validator"

export class AddArtistDto {
    @IsString()
    @IsNotEmpty()
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
}