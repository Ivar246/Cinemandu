import { DiskStorageOptions, diskStorage } from "multer";
import { extname } from "path";
import { Request } from "express";

export const multerOptions = {
    // storage configuration
    getStorage: function (des: string) {
        return diskStorage({
            destination: des,
            filename: (req: Request, file: Express.Multer.File, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
            },
        })
    },

    // file filter to validate file type
    fileFilter: (req: Request, file: Express.Multer.File, cb) => {
        if (!file.mimetype.startsWith('image')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
    // Limits configuration
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
}