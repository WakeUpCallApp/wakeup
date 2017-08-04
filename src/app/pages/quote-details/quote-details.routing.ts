
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuoteDetailsComponent } from './quote-details.component';

const routes: Routes = [
  { path: '', component: QuoteDetailsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);