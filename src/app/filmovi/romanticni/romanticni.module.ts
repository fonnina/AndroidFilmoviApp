import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RomanticniPageRoutingModule } from './romanticni-routing.module';

import { RomanticniPage } from './romanticni.page';
import { FilmoviElementComponent } from '../filmovi-element/filmovi-element.component';
import { FilmoviModalComponent } from './detaljno/filmovi-modal/filmovi-modal.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RomanticniPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [RomanticniPage, FilmoviModalComponent,FilmoviElementComponent],
  entryComponents: [FilmoviModalComponent, FilmoviElementComponent]
})
export class RomanticniPageModule {}
