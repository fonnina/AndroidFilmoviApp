import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmoviPage } from './filmovi.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: FilmoviPage,
    children: [
      {
      path: 'romanticni',
      loadChildren: () => import('./romanticni/romanticni.module').then( m => m.RomanticniPageModule)
    },
    {
      path: 'omiljeni-glumci',
      loadChildren: () => import('./omiljeni-glumci/omiljeni-glumci.module').then( m => m.OmiljeniGlumciPageModule)
    },

    {
      path: '',
      redirectTo:'/filmovi/tabs/romanticni',
      pathMatch:'full'
    },
  ]
  },
  {
    path: '',
    redirectTo:'/filmovi/tabs/romanticni',
    pathMatch:'full'
  },
  {
    path: 'omiljeni-glumci',
    loadChildren: () => import('./omiljeni-glumci/omiljeni-glumci.module').then( m => m.OmiljeniGlumciPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmoviPageRoutingModule {}
