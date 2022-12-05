import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutentikacijaGuard } from './autentikacija/autentikacija.guard';

const routes: Routes = [
  {path: '', redirectTo:'log-in', pathMatch:'full'}, //dodalaNina

  {
    path: 'filmovi',
    loadChildren: () => import('./filmovi/filmovi.module').then( m => m.FilmoviPageModule),
    canLoad: [AutentikacijaGuard]

  },
  {
    path: 'omiljeni-glumci',
    loadChildren: () => import('./filmovi/omiljeni-glumci/omiljeni-glumci.module').then( m => m.OmiljeniGlumciPageModule),
    canLoad: [AutentikacijaGuard]

  },
  {
    path: 'log-in',
    loadChildren: () => import('./autentikacija/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./autentikacija/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
