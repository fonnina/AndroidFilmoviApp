import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonSlides, LoadingController, ModalController, NavController } from '@ionic/angular';
import { FilmoviModel } from '../../filmovi.model';
import { FilmoviService } from '../../filmovi.service';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { FilmoviModalComponent } from './filmovi-modal/filmovi-modal.component';


   @Component({
  selector: 'app-detaljno',
  templateUrl: './detaljno.page.html',
  styleUrls: ['./detaljno.page.scss'],
 })
 export class DetaljnoPage implements OnInit, OnDestroy {



 film: FilmoviModel;  //NOVO
 isLoading = false;

 //recenzije: RecenzijaModel[];
 //=[];
//private recenzijaSub: Subscription;

 constructor(private router: Router,private route: ActivatedRoute,
  private filmoviServis: FilmoviService, private modalCtrl: ModalController,
   private http: HttpClient,
  private alertCtrl: AlertController, private loadCtrl: LoadingController,
  private navCtrl: NavController) { }



  ngOnInit() {
    //this.route.paramMap.subscribe(paramMap => {
     //this.film = this.filmoviServis.getFilm(paramMap.get('filmId'));
    //});
  // {id: '8',slikaUrl:'',nazivFilm:'KOKY',opis:'lal',  zanr: 'bracna putovanja', detaljanOpis:''}


    // this.getInfoRecenzije();


    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('filmId')) {
          this.navCtrl.navigateBack('/filmovi/tabs/romanticni');
          return;
      }

      this.isLoading = true;

      this.filmoviServis
          .getFilm(paramMap.get('filmId'))
          .subscribe((filmm) => {
              this.film = filmm;
              this.isLoading = false;
    });
  });


   }
   ionViewWillEnter(){

   }

 //}
//  otvoriModalE(){
//   this.modalCtrl.create({
//    component: FilmoviModalComponent
//   })
//  .then((modal)=>{
//  modal.present();
//  return modal.onDidDismiss();

//  }).then((resultData) =>{
//    if(resultData.role==='confirm'){
//     console.log(resultData);
//      this.filmoviServis.dodajFilm
//     (resultData.data.filmData.slikaUrl, resultData.data.filmData.nazivFilm,
//       resultData.data.filmData.opis, resultData.data.filmData.zanr,
//       resultData.data.filmData.detaljanOpis ).subscribe((filmovi)=>{
//       });

//    }
//   });
//   }



  ngOnDestroy(){
//   if(this.recenzijaSub){
//     this.recenzijaSub.unsubscribe();

//  }
  }



onEditFilm() {
    this.modalCtrl.create({
        component: FilmoviModalComponent,
        componentProps: {naslov:'Izmeni film', slikaUrl: this.film.slikaUrl, nazivFilm: this.film.nazivFilm,
        opis: this.film.opis, zanr: this.film.zanr, detaljanOpis: this.film.detaljanOpis}
    }).then((modal) => {
        modal.present();
        return modal.onDidDismiss();
    }).then((resultData) => {
        if (resultData.role === 'confirm') {
            console.log(resultData);

            this.filmoviServis
                .editFilm(
                    this.film.id,
                    resultData.data.filmData.slikaUrl,
                    resultData.data.filmData.nazivFilm,
                    resultData.data.filmData.opis,
                    resultData.data.filmData.zanr,
                    resultData.data.filmData.detaljanOpis,
                    resultData.data.filmData.korisnikId)
                   // this.film.userId
                .subscribe((res) => {
                    this.film.slikaUrl = resultData.data.filmData.slikaUrl;
                    this.film.nazivFilm = resultData.data.filmData.nazivFilm;
                    this.film.opis = resultData.data.filmData.opis;
                    this.film.zanr = resultData.data.filmData.zanr;
                    this.film.detaljanOpis = resultData.data.filmData.detaljanOpis;

                });
        }
    });
}
onDeleteFilm() {

  this.loadCtrl.create({message: 'Deleting...'}).then(loadingEl => {


      loadingEl.present();
      this.filmoviServis.deleteFilm(this.film.id).subscribe(() => {


          loadingEl.dismiss();
          this.navCtrl.navigateBack('/filmovi/tabs/romanticni');

      });
  });
}


  }
