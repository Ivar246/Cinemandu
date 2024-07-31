import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto';

@Injectable()
export class ReviewService {

    constructor(private prisma: PrismaService) { }

    async create(currentUserId: number, createReviewDto: CreateReviewDto) {
        try {
            const review = await this.prisma.review.create({
                data: {
                    user_id: currentUserId,
                    movie_id: createReviewDto.movie_id,
                    heading: createReviewDto.heading,
                    text: createReviewDto.text
                },
                include: {
                    movie: {
                        include: {
                            Rating: true
                        }
                    }
                }
            });

            return { data: { newReview: review } };
        } catch (error) {
            throw error
        }
    }

}
