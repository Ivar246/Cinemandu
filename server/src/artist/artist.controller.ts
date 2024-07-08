import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { AddArtistDto } from './dto/addArtist.dto';

@Controller('artist')
export class ArtistController {


    constructor(private artistService: ArtistService) { }

    @Get("/:id")
    getArtist(@Param('id', ParseIntPipe) artist_id: number) {
        return this.artistService.getArtist(artist_id);
    }

    getAllArtist() {

    }

    @HttpCode(HttpStatus.CREATED)
    @Post("/create")
    addArtist(@Body() addArtistDto: AddArtistDto) {
        return this.artistService.addArtist(addArtistDto)
    }

    updateArtist() {

    }

    deleteArtist() {

    }
}
