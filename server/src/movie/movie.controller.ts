import { Controller, Ip, Delete, Get, Post, Put, Body, UseInterceptors, UploadedFile, Param, ParseIntPipe, UploadedFiles } from '@nestjs/common';
import { MovieService } from './movie.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AddMovieDto } from './dto';
import { LoggerService } from '../logger/logger.service';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';

@ApiTags("movies")
@Controller('movie')
export class MovieController {

    constructor(private movieService: MovieService) { }
    private logger = new LoggerService(MovieController.name)


    @UseInterceptors(
        FileInterceptor('poster', {
            storage: diskStorage({
                destination: './uploads/posters',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.startsWith('image')) {
                    return cb(new Error('Only image files are allowed!'), false);
                }
                cb(null, true);
            }
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
        this.logger.log(`fetching movies from ${ip}`, MovieController.name);
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

    @UseInterceptors(FilesInterceptor("movie_gallery", 10, {
        storage: diskStorage({
            destination: './uploads/movieGallery',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
            },
        }),
    }))
    @Post("/uploadImageGallery")
    uploadImageGallery(@UploadedFiles() files: Array<Express.Multer.File>) {
        console.log(files)

    }
}
