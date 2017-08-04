
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnswersComponent } from './answers.component';

const routes: Routes = [
  { path: '', component: AnswersComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);