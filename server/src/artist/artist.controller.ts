import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { AddArtistDto } from './dto/addArtist.dto';

@Controller('artist')
export class ArtistController {

    constructor(private artistService: ArtistService) { }
    getArtist() {

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
