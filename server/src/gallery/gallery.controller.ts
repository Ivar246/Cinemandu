import { Controller, Delete, Param, ParseIntPipe, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils';
import { GalleryService } from './gallery.service';
import { EntityTypeDto } from './dto';
import { Public } from 'src/common/decorator';

@Public()
@Controller('gallery')
export class GalleryController {

    constructor(private galleryService: GalleryService) { }

    @UseInterceptors(FilesInterceptor("gallery", 10, {
        storage: multerOptions.getStorage('./uploads/gallery'),
        fileFilter: multerOptions.fileFilter,
        limits: multerOptions.limits
    }))
    @Post("/:id/uploadImages")
    uploadImages(
        @Param('id', ParseIntPipe) movie_id: number,
        @Query() entityTypeDto: EntityTypeDto,
        @UploadedFiles() files: Array<Express.Multer.File>) {
        const filePaths = files.map(file => file.path);
        return this.galleryService.uploadImageGallery(filePaths, movie_id, entityTypeDto.entity);
    }

    @Delete("/:id")
    deleteImageById(@Param('id', ParseIntPipe) id: number) {
        return this.galleryService.deleteImageFromGallery(id);
    }
}
