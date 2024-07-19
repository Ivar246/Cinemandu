import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from "fs";
import { promises as fsPromises } from 'fs';
import *as path from 'path';

@Injectable()
export class LoggerService extends ConsoleLogger {
    async logToFile(entry: string) {
        const formattedEntry = `${Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Katmandu',
        }).format(new Date())}\t${entry}\n`;
        console.log("dirname", __dirname)
        try {
            if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'))
            }
            await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'), formattedEntry)
        } catch (e) {
            if (e instanceof Error) console.error(e.message)
        }
    }
    log(message: any, context?: string) {
        const entry = `${context}\t${message}`;
        console.log(entry, "entry")
        this.logToFile(entry);
        super.log(message, context)
    }

    error(message: any, stackOrContext?: string) {
        const entry = `${message}/${stackOrContext}`
        this.logToFile(entry);
        super.error(message, stackOrContext);
    }
}
