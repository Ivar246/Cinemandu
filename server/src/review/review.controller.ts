import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { User } from 'src/common/decorator';
import { CreateReviewDto } from './dto';
import { ReviewService } from './review.service';
import { UserRole } from '@prisma/client';

@Controller('review')
export class ReviewController {

    constructor(private reviewService: ReviewService) { }

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ description: "user add new review to a movie" })
    create(@User("id") currentUserId: number,
        @Body() createReviewDto: CreateReviewDto) {
        return this.reviewService.create(currentUserId, createReviewDto);
    }



}
