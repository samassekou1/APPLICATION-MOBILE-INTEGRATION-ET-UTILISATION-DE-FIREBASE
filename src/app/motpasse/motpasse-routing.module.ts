import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotpassePage } from './motpasse.page';

const routes: Routes = [
  {
    path: '',
    component: MotpassePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotpassePageRoutingModule {}
