import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AppService } from './app.service';
import { Dimension } from './entities/dimension.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('dimensions')
  @ApiOperation({ summary: 'Get list of dimensions' })
  @ApiResponse({
    status: 200,
    description: 'List of dimensions',
    isArray: true,
    type: Dimension,
  })
  async getDimensions(): Promise<Dimension[]> {
    return await this.appService.getDimensions();
  }

  @Get('rawdata')
  @ApiOperation({ summary: 'Get raw data' })
  @ApiResponse({
    status: 200,
    description: 'Raw data response',
    isArray: true,
  })
  async getRawdata(): Promise<any[]> {
    return await this.appService.getRawdata();
  }
}
