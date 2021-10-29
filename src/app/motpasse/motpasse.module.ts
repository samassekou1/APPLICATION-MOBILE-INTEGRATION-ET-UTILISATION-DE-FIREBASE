import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotpassePageRoutingModule } from './motpasse-routing.module';

import { MotpassePage } from './motpasse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotpassePageRoutingModule
  ],
  declarations: [MotpassePage]
})
export class MotpassePageModule {}
