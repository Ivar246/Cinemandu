import { Controller, Param, Body, Post, HttpCode, HttpStatus, Get, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto';
import { UpdateGenreDto } from './dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';

@ApiTags("genres")
@Controller('genre')
export class GenreController {

    constructor(private genreService: GenreService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post("/create")
    @ApiOperation({ summary: 'create a genre' })
    @ApiResponse({ status: 201, description: 'genre created successfully.' })
    createGenre(@Body() createGenreDto: CreateGenreDto) {
        return this.genreService.createGenre(createGenreDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get("/getAllGenre")
    @ApiOperation({ summary: 'fetching all genre' })
    @ApiResponse({ status: 200, description: 'genres fetched successfully.' })
    getAllGenre() {
        return this.genreService.getAllGenre();
    }

    @HttpCode(HttpStatus.OK)
    @Put("/update/:id")
    @ApiOperation({ summary: 'updating genre by Id' })
    @ApiResponse({ status: 200, description: 'genre updated successfully.' })
    updateGenre(@Param("id", ParseIntPipe) genreId: number,
        @Body() updateGenreDto: UpdateGenreDto) {
        console.log(updateGenreDto)
        return this.genreService.updateGenre(genreId, updateGenreDto);
    }

    @HttpCode(HttpStatus.OK)
    @Delete("/delete/:id")
    @ApiOperation({ summary: 'delete genre by Id' })
    @ApiResponse({ status: 200, description: 'genre deleted successfully.' })
    deleteGenre(@Param('id', ParseIntPipe) genreId: number) {
        return this.genreService.deleteGenre(genreId);
    }
}
