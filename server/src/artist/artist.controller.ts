import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ArtistService } from './artist.service';

import { AddArtistDto, UpdateArtistDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
    @UseInterceptors(
        FileInterceptor('profile_img', {
            storage: diskStorage({
                destination: './uploads/artists_profile',
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
    addArtist(@Body() addArtistDto: AddArtistDto,
        @UploadedFile() file: Express.Multer.File) {
        const profile_img_url = `/uploads/artist_profile/${file.filename}`
        return this.artistService.addArtist(addArtistDto, profile_img_url);
    }

    @HttpCode(HttpStatus.OK)
    @Put('/update/:id')
    updateArtist(@Body() updateArtistDto: UpdateArtistDto,
        @Param('id', ParseIntPipe) artist_id: number) {
        return this.artistService.updateArtist(updateArtistDto, artist_id);
    }

    @Delete('/delete/:id')
    deleteArtist(@Param('id', ParseIntPipe) artist_id: number) {
        return this.artistService.deleteArtist(artist_id);
    }
}
