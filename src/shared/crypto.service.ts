import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
    constructor() { }

    encodeBase64(value) {
        return Buffer.from(value).toString('base64');
    }

    decodeBase64(value) {
        return Buffer.from(value, 'base64').toString()
    }
}
