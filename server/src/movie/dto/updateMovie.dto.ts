import { IsString, IsOptional, IsDate, IsInt, IsBoolean, IsArray, IsUrl, IsNotEmpty } from 'class-validator';
import { Type, Transform } from 'class-transformer';

type ArtistDetail = {
    artist_id: number
    role_ids: number[]
}

export class UpdateMovieDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsDate()
    @Type(() => Date)
    released_date: Date;


    @IsInt()
    @Type(() => Number)
    runtime: number;

    @IsOptional()
    @IsString()
    plot_summary?: string;

    @IsOptional()
    @IsUrl()
    trailer_url?: string;

    @IsOptional()
    @IsUrl()
    full_movie_url?: string;



    @IsOptional()
    @IsString()
    audience?: string;

    @IsOptional()
    @IsString()
    format?: string;

    @IsBoolean()
    @Type(() => Boolean)
    isPublished: boolean;


    @Transform(({ value }) => {
        return typeof value === 'string' ? JSON.parse(value) : value;
    })
    @IsArray()
    genreIds: number[];

    @Transform(({ value }) => {
        return typeof value === 'string' ? JSON.parse(value) : value;
    })
    @IsOptional()
    @IsArray()
    @IsOptional()
    artists: ArtistDetail[]


    @IsOptional()
    @IsString()
    production_house?: string;

    @IsOptional()
    @IsString({ each: true })
    galleryUrls?: string[];

}
