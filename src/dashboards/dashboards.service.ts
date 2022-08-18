import { Injectable } from '@nestjs/common';
import { FirebaseFirestoreService } from '@aginix/nestjs-firebase-admin';

import { DashboardDto } from './dto/dasboard.dto';
import { Dashboard } from './entities/dasboard';

@Injectable()
export class DashboardsService {
    constructor(
        private fbFirestore: FirebaseFirestoreService,
    ) { }

    async listDashboards(): Promise<Dashboard[]> {
        let dasboardsList: Dashboard[] = [];
        const querySnapshots = await this.fbFirestore
            .collection('dashboards')
            .get();
        querySnapshots.forEach(snapshot => {
            const dashboard: any = snapshot.data();
            dasboardsList.push({
                id: snapshot.id,
                name: dashboard.name
            });
        })
        return dasboardsList;
    }

    async getDashboard(dashboardId: string): Promise<Dashboard> {
        const querySnapshot = await this.fbFirestore
            .collection('dashboards')
            .doc(dashboardId)
            .get();
        const dashboard: any = querySnapshot.data();
        return dashboard ? {
            id: querySnapshot.id,
            ...dashboard,
        } : null;
    }

    async createDashboard(body: DashboardDto): Promise<string> {
        const querySnapshot = await this.fbFirestore
            .collection('dashboards')
            .add(body);
        return querySnapshot.id;
    }

    async updateDashboard(dashboardId: string, body: DashboardDto): Promise<void> {
        await this.fbFirestore
            .collection('dashboards')
            .doc(dashboardId)
            .update(body);
    }

    async deleteDashboard(dashboardId: string): Promise<void> {
        await this.fbFirestore
            .collection('dashboards')
            .doc(dashboardId)
            .delete();
    }
}
