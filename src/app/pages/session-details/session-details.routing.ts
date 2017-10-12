
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionDetailsComponent } from './session-details.component';

const routes: Routes = [
  { path: '', component: SessionDetailsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
