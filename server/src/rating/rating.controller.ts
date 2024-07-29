import { Body, Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto';
import { User } from 'src/common/decorator';

@Controller('rating')
export class RatingController {

    constructor(private ratingService: RatingService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('/movie/:movie_id')
    createRating(@User('id') user_id: number,
        @Param('movie_id', ParseIntPipe) movie_id: number,
        @Body() dto: CreateRatingDto) {
        return this.ratingService.createRating(user_id, movie_id, dto.rate);
    }
}
