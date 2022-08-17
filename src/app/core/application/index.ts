import { ApplicationService } from './application.service';
import { TosterService } from './toaster.service';

export const APPLICATION_PROVIDERS = [ApplicationService];
export const TOASTER_PROVIDERS = [TosterService];

export * from './application.service';
export * from './toaster.service';