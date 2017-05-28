import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalColors } from './modal-colors';

@NgModule({
  declarations: [
    ModalColors,
  ],
  imports: [
    IonicPageModule.forChild(ModalColors),
  ],
  exports: [
    ModalColors
  ]
})
export class ModalColorsModule {}
