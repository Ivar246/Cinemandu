import { Controller, Param, Body, Post, HttpCode, HttpStatus, Get, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto';
import { UpdateGenreDto } from './dto';

@Controller('genre')
export class GenreController {

    constructor(private genreService: GenreService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post("/create")
    createGenre(@Body() createGenreDto: CreateGenreDto) {
        return this.genreService.createGenre(createGenreDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get("/getAllGenre")
    getAllGenre() {
        return this.genreService.getAllGenre();
    }

    @HttpCode(HttpStatus.OK)
    @Put("/update/:id")
    updateGenre(@Param("id", ParseIntPipe) genreId: number,
        @Body() updateGenreDto: UpdateGenreDto) {
        console.log(updateGenreDto)
        return this.genreService.updateGenre(genreId, updateGenreDto);
    }

    @HttpCode(HttpStatus.OK)
    @Delete("/delete/:id")
    deleteGenre(@Param('id', ParseIntPipe) genreId: number) {
        return this.genreService.deleteGenre(genreId);
    }
}
