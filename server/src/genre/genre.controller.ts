import { Controller, Param, Body, Post, HttpCode, HttpStatus, Get, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {

    constructor(private genreService: GenreService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post("/create")
    createGenre(@Body() genre_name: string) {
        return this.genreService.createGenre(genre_name);
    }

    @HttpCode(HttpStatus.OK)
    @Get("/getAllRoles")
    getAllGenre() {
        return this.genreService.getAllGenre();
    }

    @HttpCode(HttpStatus.OK)
    @Put("/update/:id")
    updateGenre(@Param("id", ParseIntPipe) genreId: number,
        @Body("name") genreName: string) {
        return this.genreService.updateGenre(genreId, genreName);
    }

    @HttpCode(HttpStatus.OK)
    @Delete("/delete/:id")
    deleteGenre(@Param('id', ParseIntPipe) genreId: number) {
        return this.genreService.deleteGenre(genreId);
    }
}
