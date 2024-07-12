import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GenreService {
    constructor(private prisma: PrismaService) { }


    async createGenre(genreName: string) {
        try {
            const genre = await this.prisma.genre.create({
                data: { genre_name: genreName },
            });
            return { data: genre, message: 'Genre created' };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('genre already exists');
                }
            }
            if (error.code === 500)
                throw new InternalServerErrorException(error.message);
            return error
        }
    }

    async getAllGenre() {
        try {
            const genres = await this.prisma.genre.findMany();

            if (genres.length === 0) throw new NotFoundException("No genres available")

            return { data: genres, message: "Genres fetched successfully." }
        } catch (error) {
            if (error.code === 500)
                throw new InternalServerErrorException(error.message)
            return error
        }
    }

    async updateGenre(genreId: number, genreName: string) {
        try {
            const genre = await this.prisma.genre.findUnique({ where: { id: genreId } })
            if (!genre) throw new NotFoundException("Genre with the Id not found")
            const updatedGenre = await this.prisma.genre.update({
                where: { id: genreId },
                data: {
                    genre_name: genreName
                }
            });

            return { data: updatedGenre, message: `Genre with id ${genreId} updated successfully` }
        } catch (error) {
            if (error.code === 500)
                throw new InternalServerErrorException(error.message)
            return error
        }
    }

    async deleteGenre(genreId: number) {
        try {
            const genre = await this.prisma.genre.delete({ where: { id: genreId } });
            return { data: genre, message: "Genre deleted Successfully" }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError)
                if (error.code === 'P2025')
                    throw new NotFoundException("Genre doesn't exist.")
            if (error.code === 500) throw new InternalServerErrorException(error.message)
            return error;
        }
    }


}
