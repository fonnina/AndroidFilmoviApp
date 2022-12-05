import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetaljnoPageRoutingModule } from '../detaljno-routing.module';

import { DetaljnoPage } from './detaljno.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetaljnoPageRoutingModule
  ],
  declarations: [DetaljnoPage],
  entryComponents: []
})
export class DetaljnoPageModule {}
