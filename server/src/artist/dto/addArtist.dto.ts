import { Transform } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional, IsString, IsInt } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class AddArtistDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    artist_name: string

    @IsDate()
    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : value)
    @ApiProperty()
    DOB: Date

    @IsString()
    @IsOptional()
    @ApiProperty()
    profile_summary: string

    @Transform(({ value }) => {
        return typeof value === 'string' ? JSON.parse(value) : value;
    })
    @IsOptional()
    @IsInt({ each: true })
    @ApiProperty()
    roleIds: number[]
}