import { Module } from '@nestjs/common';

import { CommonModule } from 'src/common';

import { DashboardsController } from './dashboards.controller';
import { DashboardsService } from './dashboards.service';

@Module({
  imports: [CommonModule],
  controllers: [DashboardsController],
  providers: [DashboardsService],
  exports: [DashboardsModule]
})
export class DashboardsModule { }
