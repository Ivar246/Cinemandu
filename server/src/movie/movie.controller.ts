import { Controller, Ip, Delete, Get, Post, Put, Body, UseInterceptors, UploadedFile, Param, ParseIntPipe, UploadedFiles } from '@nestjs/common';
import { MovieService } from './movie.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AddMovieDto } from './dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { multerOptions } from 'src/utils';
import { Public } from 'src/common/decorator';

@ApiTags("movies")
@Controller('movie')
@Public()
export class MovieController {

    constructor(private movieService: MovieService) { }


    @UseInterceptors(
        FileInterceptor('poster', {
            storage: multerOptions.getStorage("uploads/moviePoster"),
            fileFilter: multerOptions.fileFilter,
            limits: multerOptions.limits
        }),
    )
    @Post("/create")
    @ApiOperation({ summary: 'Add a new movie' })
    @ApiResponse({ status: 201, description: 'new movie added successfully.' })
    addMovie(
        @Body() addMovieDto: AddMovieDto,
        @UploadedFile() poster: Express.Multer.File) {
        const posterUrl = poster ? `/uploads/posters/${poster.filename}` : null;
        return this.movieService.addMovie(addMovieDto, posterUrl);
    }

    @Get('/getmovies')
    @ApiOperation({ summary: 'fetching all movies' })
    @ApiResponse({ status: 200, description: 'movies fetched successfully.' })
    getMovies(@Ip() ip: string) {
        return this.movieService.getMovies();
    }

    @Get("/:id")
    getMovie(@Param('id', ParseIntPipe) movieid: number) {
        return this.movieService.getMovie(movieid);
    }

    // @Put("/update/:id")
    // updateMovie() {
    //     return this.movieService.updateMovie();
    // }

    @Delete('/delete/:id')
    @ApiOperation({ summary: 'delete a movie by id' })
    @ApiResponse({ status: 200, description: 'movie deleted successfully.' })
    deleteMovie(@Param('id', ParseIntPipe) movie_id: number) {
        return this.movieService.deleteMovie(movie_id);
    }
}
