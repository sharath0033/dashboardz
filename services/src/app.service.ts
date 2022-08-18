import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { FirebaseFirestoreService } from '@aginix/nestjs-firebase-admin';

import { FilesystemService } from './shared';
import { Dimension } from './entities/dimension.entity';

@Injectable()
export class AppService {
  constructor(
    private fbFirestore: FirebaseFirestoreService,
    private fsService: FilesystemService,
  ) { }

  async getDimensions(): Promise<Dimension[]> {
    const querySnapshot = await this.fbFirestore
      .collection('columns')
      .doc('dimensions')
      .get();
    return Object.entries(querySnapshot.data()).map(([key, value]) => {
      return {
        name: key,
        dataType: value
      }
    });
  }

  async getRawdata(): Promise<any[]> {
    const filePath = join(__dirname, './resources/ads_data.json');
    return await this.fsService.readFile(filePath);
  }
}
