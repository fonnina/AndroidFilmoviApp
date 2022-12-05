import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RomanticniPage } from './romanticni.page';

const routes: Routes = [
  {
    path: '',
    component: RomanticniPage
  },
  {
    path: ':filmId',
    loadChildren: () => import('./detaljno/detaljno.module').then( m => m.DetaljnoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RomanticniPageRoutingModule {}
