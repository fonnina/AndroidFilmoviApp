import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filmovi-modal',
  templateUrl: './filmovi-modal.component.html',
  styleUrls: ['./filmovi-modal.component.scss'],
})
export class FilmoviModalComponent implements OnInit {


  @ViewChild('f',{static: true}) form: NgForm;
  @Input() naslov: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  otkaziAkc(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onAddFilm(){
    if(!this.form.valid){
      return;

    }
    this.modalCtrl.dismiss({filmData:
      {
        slikaUrl: this.form.value.slikaUrl,
        nazivFilm: this.form.value.nazivFilm,
        opis: this.form.value.opis,
      zanr: this.form.value.zanr,
    detaljanOpis: this.form.value.detaljanOpis
      }
    },
       'confirm');

  }

}
