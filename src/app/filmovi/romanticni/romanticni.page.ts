import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FilmoviModalComponent } from './detaljno/filmovi-modal/filmovi-modal.component';
import { FilmoviModel } from '../filmovi.model';
import { FilmoviService } from '../filmovi.service';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-romanticni',
  templateUrl: './romanticni.page.html',
  styleUrls: ['./romanticni.page.scss'],
})
export class RomanticniPage implements OnInit, OnDestroy {
  @ViewChild(IonSlides) slides: IonSlides;

  // filmovi:  FilmoviModel[] =
  // [{slikaUrl:'/assets/adorable-pug-puppy-solo-portrait.jpg', nazivFilm:'Koky mopsara na medenom mesecu',
  //  opis:'Koky mopsic krece na uzbudljiv medeni mesec sa svojom izabranom dragom mopsicom', zanr: 'horor'},
  //  {slikaUrl:'/assets/nica.jpg',
  //  nazivFilm:'Koky mopsara na medenom mesecu',
  //  opis:'Koky mopsic krece na uzbudljiv medeni mesec sa svojom izabranom dragom mopsicom', zanr:'komedija'}];

  filmovi:  FilmoviModel[]=[];
  searchedFilm: FilmoviModel;
   indexNumber: number;
   reverse: true;
private filmoviSub: Subscription;


  constructor( private filmoviServis: FilmoviService,private modalCtrl: ModalController) {
//    console.log('constructor'); //NOVO
    //this.filmovi = this.filmoviServis.filmovi;
  }

  ngOnInit() {
   // console.log('ngOnInit');
   this.filmoviSub = this.filmoviServis.filmovi.subscribe((filmovi) =>{
    console.log(filmovi);

      this.filmovi = filmovi;
    });
  }


ionViewWillEnter(){
  this.filmoviServis.getFilmovi().subscribe((filmovi) =>{
    console.log(filmovi);
    });
 }
 otvoriModal(){
  this.modalCtrl.create({
   component: FilmoviModalComponent
  })
 .then((modal)=>{
 modal.present();
 return modal.onDidDismiss();

 }).then((resultData) =>{
   if(resultData.role==='confirm'){
    console.log(resultData);
     this.filmoviServis.dodajFilm
    (resultData.data.filmData.slikaUrl, resultData.data.filmData.nazivFilm,
      resultData.data.filmData.opis, resultData.data.filmData.zanr,
      resultData.data.filmData.detaljanOpis)
     .subscribe((filmovi)=>{
  //    this.recenzije= recenzije;
     });

   }
  });
  }
  async filtered(event){
    const searchName= event.srcElement.value;

    if(!searchName){
      return;
    }

    let count=0;
    this.filmovi.forEach(film => {

      if (film.nazivFilm.toLowerCase().includes(searchName.toLowerCase())){
         this.searchedFilm=film;
        this.indexNumber=count;
      } else{
        count++;
      }

    });
    console.log('filmovi');
    console.log(this.filmovi);
    console.log('searchedFilm');
    console.log(this.searchedFilm);
    console.log('indexNumber');
    console.log(this.indexNumber);

    this.slides.slideTo(this.indexNumber);

  }

/*declare one variable */

/* bind this sort function to id column*/



  ngOnDestroy(){
    if(this.filmoviSub){
      this.filmoviSub.unsubscribe();

   }
    }
}
