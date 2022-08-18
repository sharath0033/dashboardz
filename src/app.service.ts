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

  async getWidgetData(_body: any): Promise<any[]> {
    const startDate = new Date(_body.dateRange[0]).getTime();
    const endDate = new Date(_body.dateRange[1]).getTime();

    const rawData: any[] = await this.fsService.readFile(
      join(__dirname, './resources/ads_data.json')
    );

    return rawData.filter(item => {
      let time = new Date(item.date).getTime();
      return (startDate <= time && time <= endDate);
    });
  }
}
