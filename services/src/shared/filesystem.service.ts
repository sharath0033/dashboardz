import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

@Injectable()
export class FilesystemService {
    constructor() { }

    async readFile(filePath: string): Promise<any> {
        return await fs.readJsonSync(filePath, { throws: false });
    };
}
