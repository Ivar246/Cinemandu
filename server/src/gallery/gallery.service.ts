import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
                return { data: { ...upload, gallery: upload.gallery.map(img => ({ id: img.id, url: img.url })) }, message: "Images uploaded successfully" }
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

                return { data: { ...upload, gallery: upload.gallery.map(img => ({ id: img.id, url: img.url })) }, message: "artist image uploaded successfully" };

            }
        } catch (error) {
            throw error;
        }
    }

    async deleteImageFromGallery(img_id: number) {
        try {
            const image = await this.prisma.image.delete({
                where: { id: img_id }
            });

            return { data: { deletedImage: image }, message: "image successfully deleted" }
        } catch (error) {
            throw error;
        }

    }
}
