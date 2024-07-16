import { Controller, Delete, Get, Post, Put, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MovieService } from './movie.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AddMovieDto } from './dto';
import { Movie } from '@prisma/client';




@Controller('movie')
export class MovieController {

    constructor(private movieService: MovieService) { }
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
    getMovies() {
        return this.movieService.getMovies();
    }

    // @Get("/:id")
    // getMovie() {
    //     return this.movieService.getMovie();
    // }

    // @Put("/update/:id")
    // updateMovie() {
    //     return this.movieService.updateMovie();
    // }

    // @Delete('/delete/:id')

    // deleteMovie() {
    //     return this.movieService.deleteMovie();
    // }


}
