import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DashboardsService } from './dashboards.service';
import { DashboardDto } from './dto/dasboard.dto';
import { Dashboard } from './entities/dasboard';

@ApiTags('Dashboards')
@Controller('dashboards')
export class DashboardsController {
    constructor(private dashboardsService: DashboardsService) { }

    @Get()
    @ApiOperation({ summary: 'Get list of dashboards' })
    @ApiResponse({
        status: 200,
        description: 'List of dashboards',
        isArray: true,
        type: Dashboard,
    })
    async listDashboards(): Promise<Dashboard[]> {
        return await this.dashboardsService.listDashboards();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get dashboard detail' })
    @ApiResponse({
        status: 200,
        description: 'Dashboard detail',
        type: Dashboard,
    })
    async getDashboard(@Param('id') dashboardId: string): Promise<Dashboard> {
        return await this.dashboardsService.getDashboard(dashboardId);
    }

    @Post()
    @ApiOperation({ summary: 'Create dashboard' })
    @ApiResponse({
        status: 200,
        description: 'Create Dashboard',
    })
    async createDashboard(@Body() body: DashboardDto): Promise<Dashboard> {
        return await this.dashboardsService.createDashboard(body);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update dashboard' })
    @ApiResponse({
        status: 200,
        description: 'Update Dashboard',
    })
    async updateDashboard(
        @Param('id') dashboardId: string,
        @Body() body: DashboardDto,
    ): Promise<void> {
        return await this.dashboardsService.updateDashboard(dashboardId, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete dashboard' })
    @ApiResponse({
        status: 200,
        description: 'Delete Dashboard',
    })
    async deleteDashboard(@Param('id') dashboardId: string): Promise<void> {
        return await this.dashboardsService.deleteDashboard(dashboardId);
    }
}
