import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('movie')
export class MovieController {

    @Post('/create')
    addMovie() {

    }

    @Get('/getmovies')
    getMovies() {

    }

    @Get("/:id")
    getMovie() {

    }

    @Put("/update/:id")
    updateMovie() {

    }

    @Delete('/delete/:id')

    deleteMovie() {

    }


}
