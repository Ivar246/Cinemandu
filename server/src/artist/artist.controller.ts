import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { AddArtistDto, UpdateArtistDto } from './dto';

@Controller('artist')
export class ArtistController {


    constructor(private artistService: ArtistService) { }


    @HttpCode(HttpStatus.OK)
    @Get("/getAll")
    getAllArtist() {
        return this.artistService.getAllArtist();
    }

    @HttpCode(HttpStatus.OK)
    @Get("/:id")
    getArtist(@Param('id', ParseIntPipe) artist_id: number) {
        return this.artistService.getArtist(artist_id);
    }


    @HttpCode(HttpStatus.CREATED)
    @Post("/create")
    addArtist(@Body() addArtistDto: AddArtistDto) {
        return this.artistService.addArtist(addArtistDto);
    }

    @HttpCode(HttpStatus.OK)
    @Put('/update/:id')
    updateArtist(@Body() updateArtistDto: UpdateArtistDto,
        @Param('id', ParseIntPipe) artist_id: number) {
        return this.artistService.updateArtist(updateArtistDto, artist_id);
    }

    deleteArtist() {

    }
}
