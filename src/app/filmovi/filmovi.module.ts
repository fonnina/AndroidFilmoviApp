import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilmoviPageRoutingModule } from './filmovi-routing.module';

import { FilmoviPage } from './filmovi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilmoviPageRoutingModule
  ],
  declarations: [FilmoviPage]
})
export class FilmoviPageModule {}
