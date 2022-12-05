import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { FilmoviModel } from '../filmovi.model';
import { FilmoviService } from '../filmovi.service';

@Component({
  selector: 'app-filmovi-element',
  templateUrl: './filmovi-element.component.html',
  styleUrls: ['./filmovi-element.component.scss'],
})
export class FilmoviElementComponent implements OnInit {

//  film: FilmoviModel;
  @Input() film: FilmoviModel = {id: '8',slikaUrl:'',nazivFilm:'KOKY',opis:'lal',  zanr: 'bracna putovanja', detaljanOpis:'',korisnikId:''};
  isLoading = false;
  constructor(private alertCtrl: AlertController,
    private navCtrl: NavController, private loadCtrl: LoadingController,
    private filmoviServis: FilmoviService, private route: ActivatedRoute) { }

  ngOnInit() {

  }
  otvoriAlert(event){
    event.stopPropagation();
    event.preventDefault();
    this.alertCtrl.create({
      header: 'Sacuvaj film',
      message: 'Da li ste sigurni da zelite da sacuvate film?',
      buttons: [
        {
        text: 'Sacuvaj',
        handler: () =>{
        //da vodi na tab sacuvano, da prikaze film
        console.log('sacuvano');
         },

      },
      {
        text: 'Otkazi',
        handler: ()=> {
          console.log('n');
        }
      }
    ]
    }).then ((alert: HTMLIonAlertElement) =>{
      alert.present();
    });
  }




}
