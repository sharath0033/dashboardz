import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post('widgetdata')
  @ApiOperation({ summary: 'Get widget data' })
  @ApiResponse({
    status: 200,
    description: 'Widget data response',
    isArray: true,
  })
  async getWidgetData(@Body() body: any): Promise<any[]> {
    return await this.appService.getWidgetData(body);
  }
}
