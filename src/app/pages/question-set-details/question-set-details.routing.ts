import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionSetDetailsComponent } from './question-set-details.component';

const routes: Routes = [
  { path: '', component: QuestionSetDetailsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
