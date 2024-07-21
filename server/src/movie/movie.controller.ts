import { Controller, Ip, Delete, Get, Post, Put, Body, UseInterceptors, UploadedFile, Param, ParseIntPipe } from '@nestjs/common';
import { MovieService } from './movie.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AddMovieDto } from './dto';
import { LoggerService } from '../logger/logger.service';


@Controller('movie')
export class MovieController {

    constructor(private movieService: MovieService) { }
    private logger = new LoggerService(MovieController.name)

    @Post('/create')
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
    addMovie(
        @Body() addMovieDto: AddMovieDto,
        @UploadedFile() poster: Express.Multer.File) {
        const posterUrl = poster ? `/uploads/posters/${poster.filename}` : null;
        return this.movieService.addMovie(addMovieDto, posterUrl);
    }

    @Get('/getmovies')
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

    deleteMovie(@Param('id', ParseIntPipe) movie_id: number) {
        return this.movieService.deleteMovie(movie_id);
    }


}
