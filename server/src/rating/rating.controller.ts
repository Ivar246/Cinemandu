import { Body, Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { CreateRatingDto, UpdateRatingDto } from './dto';
import { User } from 'src/common/decorator';

@ApiTags("rating")
@Controller('rating')
export class RatingController {

    constructor(private ratingService: RatingService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('/movie/:movie_id')
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
}
