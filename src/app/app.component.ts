import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AutentikacijaService } from './autentikacija/autentikacija.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private authServis: AutentikacijaService,
    private router: Router
){}
onLogOut() {
  this.authServis.logOut();
  this.router.navigateByUrl('/log-in');
}
}
