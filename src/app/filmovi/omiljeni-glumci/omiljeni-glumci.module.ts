import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OmiljeniGlumciPageRoutingModule } from './omiljeni-glumci-routing.module';

import { OmiljeniGlumciPage } from './omiljeni-glumci.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OmiljeniGlumciPageRoutingModule
  ],
  declarations: [OmiljeniGlumciPage]
})
export class OmiljeniGlumciPageModule {}
