import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Waranty } from './waranty';

@NgModule({
  declarations: [
    Waranty,
  ],
  imports: [
    IonicPageModule.forChild(Waranty),
  ],
  exports: [
    Waranty
  ]
})
export class WarantyModule {}
