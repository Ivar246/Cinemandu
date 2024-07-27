import { diskStorage } from "multer";
import { extname } from "path";
import { Request } from "@nestjs/common";

export const multerOptions = {
    storage: diskStorage({
        destination: './uploads/movieGallery',
        filename: (req: Request, file: Express.Multer.File) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
    }),
}