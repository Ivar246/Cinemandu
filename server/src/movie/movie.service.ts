import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddMovieDto } from './dto';
import { Audience, Format, Genre, Movie } from '@prisma/client';
import { format } from 'path';
import { create } from 'domain';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class MovieService {

    constructor(private prisma: PrismaService) { }

    // utility function
    stringToAudience(value: string): Audience | undefined {
        if (value.toUpperCase() === Audience.ADULT)
            return Audience.ADULT;
        else if (value.toUpperCase() === Audience.CHILDREN)
            return Audience.CHILDREN;
        else if (value.toUpperCase() === Audience.FAMILY)
            return Audience.FAMILY;
        else
            return undefined;
    }

    stringToFormat(value: string): Format | undefined {
        if (value.toUpperCase() === Format.FEATURE_FILM)
            return Format.FEATURE_FILM;
        else if (value.toUpperCase() === Format.SHORT_FILM)
            return Format.SHORT_FILM;
        else if (value.toUpperCase() === Format.SERIAL)
            return Format.SERIAL;
        else
            return undefined;
    }


    async addMovie(createMovieDto: AddMovieDto, posterUrl: string) {
        const {
            title,
            released_date,
            runtime,
            plot_summary,
            trailer_url,
            full_movie_url,
            audience,
            format,
            isPublished,
            genreIds,
            artistIds,
            production_house
        } = createMovieDto;

        const aud = this.stringToAudience(audience);
        if (!aud) throw new BadRequestException("undefined is not assignable to type Audience");

        const typedFormat = this.stringToFormat(format);
        if (!typedFormat) throw new BadRequestException("undefined is not assigable to type Format");

        const fetchedGenres = await this.prisma.genre.findMany({
            where: { id: { in: genreIds } },
            select: { id: true }
        })
        if (fetchedGenres.length !== genreIds.length) throw new BadRequestException("Some roles doesn't exist");

        const fetchedArtists = await this.prisma.artist.findMany({
            where: { id: { in: artistIds } },
            select: { id: true }
        });

        if (fetchedArtists.length !== artistIds.length) throw new BadRequestException("some artist doesn't exist");
        try {
            const movie = await this.prisma.movie.create({
                data: {
                    title,
                    released_date,
                    runtime,
                    poster_url: posterUrl,
                    plot_summary,
                    trailer_url,
                    full_movie_url,
                    audience: aud,
                    format: typedFormat,
                    isPublished,
                    production_house,
                    genre: {
                        connect: fetchedGenres,
                    },
                    MovieArtist: {
                        create: artistIds.map(a => ({ artist: { connect: { id: a } } }))
                    }
                },
                include: {
                    MovieArtist: {
                        include: {
                            MovieArtistRole: {
                                include: {
                                    role: true,
                                }
                            }
                        }
                    },
                    genre: true
                }
            });

            return { data: movie, message: 'Movie created successfully.' };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}