import { NgModule } from '@angular/core';

import { APPLICATION_PROVIDERS } from './application';
import { TOASTER_PROVIDERS } from './application';

@NgModule({
    providers: [
        ...APPLICATION_PROVIDERS,
        ...TOASTER_PROVIDERS
    ]
})

export class CoreModule { }