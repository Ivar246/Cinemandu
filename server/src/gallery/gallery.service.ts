import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityTypeDto } from './dto';

@Injectable()
export class GalleryService {
    constructor(private prisma: PrismaService) { }

    async uploadImageGallery(fileUrls: string[], entity_id: number, entity: string) {
        try {
            if (entity === "movie") {
                const upload = await this.prisma.movie.update({
                    where: {
                        id: entity_id
                    },
                    data: {
                        gallery: {
                            create: fileUrls.map(fileUrl => ({ url: fileUrl }))
                        }
                    },
                    include: {
                        gallery: true
                    },

                });
                return { data: { ...upload, gallery: upload.gallery.map(img => img.url) }, message: "Images uploaded successfully" }
            }
            else {
                const upload = await this.prisma.artist.update({
                    where: {
                        id: entity_id,
                    },
                    data: {
                        gallery: {
                            create: fileUrls.map(fileUrl => ({ url: fileUrl }))
                        }
                    },
                    include: {
                        gallery: true
                    }
                });

                return { data: { ...upload, gallery: upload.gallery.map(img => img.url) }, message: "artist image uploaded successfully" };

            }
        } catch (error) {
            throw error;
        }
    }
}
