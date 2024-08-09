import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorator';
import { CreateReviewDto, UpdateReviewDto } from './dto';
import { ReviewService } from './review.service';
import { UserRole } from '@prisma/client';

@ApiTags("review")
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

    @Get("/reviews")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ description: "fetching all the reveiew" })
    findAll() {
        return this.reviewService.findAll()
    }

    @Put('/update/:review_id')
    updateReview(@Param("review_id", ParseIntPipe) review_id: number,
        @Body() updateReviewDto: UpdateReviewDto) {
        return this.reviewService.updateReview(review_id, updateReviewDto);
    }


}
