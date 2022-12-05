import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutentikacijaGuard } from 'src/app/autentikacija/autentikacija.guard';

import { DetaljnoPage } from './detaljno/detaljno.page';

const routes: Routes = [
  {
    path: '',
    component: DetaljnoPage,
    //canActivate: [AutentikacijaGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetaljnoPageRoutingModule {}
