import { Injectable } from '@nestjs/common';

import { DashboardDto } from './dto/dasboard.dto';
import { Dashboard } from './entities/dasboard';

@Injectable()
export class DashboardsService {
    constructor() { }

    async listDashboards(): Promise<Dashboard[]> {
        return;
    }


    async getDashboard(dashboardId: string): Promise<Dashboard> {
        return;
    }


    async createDashboard(body: DashboardDto): Promise<string> {
        return;
    }


    async updateDashboard(dashboardId: string, body: DashboardDto): Promise<string> {
        return;
    }


    async deleteDashboard(dashboardId: string): Promise<void> {
        return;
    }
}
