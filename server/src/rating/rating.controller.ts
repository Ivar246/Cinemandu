import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { CreateRatingDto, UpdateRatingDto } from './dto';
import { User } from 'src/common/decorator';
import { UserRole } from '@prisma/client';

@ApiTags("rating")
@Controller('rate')
export class RatingController {

    constructor(private ratingService: RatingService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('/movie/create/:movie_id')
    @ApiOperation({ description: "user rate movie" })
    @ApiResponse({ status: 200, description: "rating successfull" })
    createRating(@User('id') user_id: number,
        @Param('movie_id', ParseIntPipe) movie_id: number,
        @Body() dto: CreateRatingDto) {
        return this.ratingService.createRating(user_id, movie_id, dto.rate);
    }

    @HttpCode(HttpStatus.OK)
    @Put('/update/:movie_id')
    updateRating(
        @User('id') user_id: number,
        @Param("movie_id", ParseIntPipe) movie_id: number,
        @Body() updateRatingDto: UpdateRatingDto) {

        return this.ratingService.updateRating(user_id, movie_id, updateRatingDto.rate);

    }

    @HttpCode(HttpStatus.OK)
    @Get('/user/:user_id')
    @ApiOperation({ description: "get all ratings for particular user, only current user and admin user are allowed to do it" })
    @ApiResponse({ status: 200, description: "fetch successfull" })
    findAllUserRating(
        @User('id') currentUserId: number,
        @User('user_role') currentUserRole: UserRole,
        @Param('user_id', ParseIntPipe) user_id: number) {
        return this.ratingService.findAllUserRating(user_id, currentUserId, currentUserRole);
    }
}
