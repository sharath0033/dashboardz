import { Module } from '@nestjs/common';

import { CommonModule } from 'src/common';

import { CryptoService } from './crypto.service';
import { FilesystemService } from './filesystem.service';

@Module({
  imports: [CommonModule],
  providers: [
    CryptoService,
    FilesystemService,
  ],
  exports: [
    CryptoService,
    FilesystemService,
  ]
})
export class SharedModule { }
