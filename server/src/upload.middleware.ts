import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req: Request, file, cb) => {
        const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;

        cb(null, `${filename}${extension}`);
    },
});

const upload = multer({ storage });

@Injectable()
export class UploadMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        upload.single('poster')(req, res, (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    }
}