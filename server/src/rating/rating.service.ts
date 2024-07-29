import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRatingDto } from './dto';

@Injectable()
export class RatingService {

    constructor(private prisma: PrismaService) { }

    async createRating(user_id: number, movie_id: number, rate: number) {
        try {
            const movie = await this.prisma.movie.findUnique({
                where: {
                    id: movie_id
                }
            })
            if (!movie) throw new HttpException("sorry, movie with the id doesn't exist", HttpStatus.CONFLICT)

            const rating = await this.prisma.rating.create({
                data: {
                    rate: rate,
                    user_id: user_id,
                    movie_id: movie_id
                },
            });

            return { data: { rateTitle: { rating: { value: rating.rate } } }, message: "movie has been rated successfully" }
        } catch (error) {
            throw error;
        }
    }

    async updateRating(user_id: number, movie_id: number, rate: number) {
        try {
            const updatedRating = await this.prisma.rating.update({
                where: {
                    user_id_movie_id: {
                        user_id: user_id,
                        movie_id: movie_id
                    }
                },
                data: {
                    rate: rate
                }
            });

            return { data: { rateTitle: { rating: { value: updatedRating.rate } } }, message: "rating updated successfully" };
        } catch (error) {
            throw error;
        }
    }
}
