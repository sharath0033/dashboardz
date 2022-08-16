import { Module } from '@nestjs/common';

import { CommonModule } from 'src/common';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [CommonModule],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardModule]
})
export class DashboardModule { }
