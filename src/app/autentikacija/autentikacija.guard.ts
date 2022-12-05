import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AutentikacijaService } from './autentikacija.service';

@Injectable({
  providedIn: 'root'
})
export class AutentikacijaGuard implements CanLoad {
  constructor(private autentServis: AutentikacijaService, private router: Router){}
  canLoad(route: Route, segments: UrlSegment[]):
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.autentServis.daLiJeKorisnikAut.pipe(
        take(1),
        tap(isAuth => {
            if (!isAuth) {
                this.router.navigateByUrl('/log-in');
            }
        }));

}
}
