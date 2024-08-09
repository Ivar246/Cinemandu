import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddMovieDto } from './dto';
import { Audience, Format } from '@prisma/client';

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
            artists,
            production_house
        } = createMovieDto;

        const artistIds = artists.map(a => a.artist_id)


        const aud = this.stringToAudience(audience);
        if (!aud) throw new BadRequestException("undefined is not assignable to type Audience");

        const typedFormat = this.stringToFormat(format);
        if (!typedFormat) throw new BadRequestException("undefined is not assigable to type Format");

        const fetchedGenres = await this.prisma.genre.findMany({
            where: { id: { in: genreIds } },
            select: { id: true }
        })
        if (fetchedGenres.length !== genreIds.length) throw new BadRequestException("Some genres doesn't exist");

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
                        create: artists.map(a => ({
                            artist: { connect: { id: a.artist_id } },
                            MovieArtistRole: { create: a.role_ids.map(rid => ({ role: { connect: { id: rid } } })) }
                        }))
                    }
                },
                include: {
                    MovieArtist: {
                        include: {
                            MovieArtistRole: {
                                include: {
                                    role: true,
                                }
                            },
                            artist: true
                        }
                    },
                    genre: true
                }
            });


            return { data: movie, message: 'Movie created successfully.' };
        } catch (error) {
            throw error;
        }
    }

    async getMovies() {
        try {
            const movies = await this.prisma.movie.findMany({
                include: {
                    genre: true,
                    MovieArtist: {
                        include: {
                            artist: true,
                            MovieArtistRole: {
                                include: {
                                    role: true
                                }
                            }
                        }
                    }

                },
            });

            if (movies.length === 0) throw new HttpException('No movies found', HttpStatus.NOT_FOUND);

            const totalMovies = await this.prisma.movie.count();

            const filteredMovie = movies.map(movie => {
                return {
                    ...movie,
                    genre: movie.genre.map(g => ({ id: g.id, genre_name: g.genre_name })),
                    MovieArtist: movie.MovieArtist.map(ma => {
                        return {
                            artist: {
                                id: ma.artist.id,
                                artist_name: ma.artist.artist_name
                            },
                            roleInMovie: ma.MovieArtistRole.map(mar => ({ id: mar.role.id, role_name: mar.role.role_name }))
                        };
                    }),
                    producers: movie.MovieArtist.filter(ma => ma.MovieArtistRole.some(mar => mar.role.role_name === "producer"))
                        .map(ma => ma.artist.artist_name),
                    directors: movie.MovieArtist.filter(ma => ma.MovieArtistRole.some(mar => mar.role.role_name === "director"))
                        .map(ma => ma.artist.artist_name),
                    pagination: {
                        totalMovies: totalMovies
                    }
                }
            });


            return { data: filteredMovie, message: "Movies fetched successfully." };
        } catch (error) {
            throw error;
        }
    }

    async getMovie(movieid: number) {
        try {
            const movie = await this.prisma.movie.findUnique({
                where: { id: movieid },
                include: {
                    genre: true,
                    MovieArtist: {
                        include: {
                            artist: true,
                            MovieArtistRole: {
                                include: {
                                    role: true
                                }
                            }
                        }
                    }

                },
            });

            if (!movie) throw new NotFoundException('movie with the id not found.')


            const filteredData = {
                ...movie,
                genre: movie.genre.map(g => ({ id: g.id, genre_name: g.genre_name })),
                MovieArtist: movie.MovieArtist.map(ma => {
                    return {
                        artist: {
                            id: ma.artist.id,
                            artist_name: ma.artist.artist_name
                        },
                        roleInMovie: ma.MovieArtistRole.map(mar => ({ id: mar.role.id, role_name: mar.role.role_name }))
                    };
                }),
                producers: movie.MovieArtist.filter(ma => ma.MovieArtistRole.some(mar => mar.role.role_name === "producer"))
                    .map(ma => ma.artist.artist_name),
                directors: movie.MovieArtist.filter(ma => ma.MovieArtistRole.some(mar => mar.role.role_name === "director"))
                    .map(ma => ma.artist.artist_name)
            }

            return { data: filteredData, message: 'movie fetched successfully' };

        } catch (error) {
            throw new HttpException(error.message, error.statusCode);
        }
    }

    async deleteMovie(movie_id: number) {
        try {
            const movie = await this.prisma.movie.delete({
                where: {
                    id: movie_id
                }
            });
            return { data: movie, message: "movie has been deleted successfully." }
        } catch (error) {
            throw error;
        }
    }


}

