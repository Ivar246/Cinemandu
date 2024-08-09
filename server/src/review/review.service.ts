import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto, UpdateReviewDto } from './dto';

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

    async findAll() {
        try {
            const reviews = await this.prisma.review.findMany({
                include: {
                    movie: true,
                }
            });

            return { data: { reviews } }
        } catch (error) {
            throw error;
        }
    }

    async updateReview(review_id: number, updateReviewDto: UpdateReviewDto) {
        try {
            const updatedReview = await this.prisma.review.update({
                where: {
                    id: review_id
                },
                data: {
                    ...updateReviewDto
                },
                include: {
                    movie: true
                }
            });

            return { data: { updatedReview } };
        } catch (error) {
            throw error;
        }
    }
}
