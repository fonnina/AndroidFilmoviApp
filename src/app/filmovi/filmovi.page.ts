import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-filmovi',
  templateUrl: './filmovi.page.html',
  styleUrls: ['./filmovi.page.scss'],

})
export class FilmoviPage implements OnInit, OnDestroy{

  constructor() {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
}
