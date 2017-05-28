import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalIcons } from './modal-icons';

@NgModule({
  declarations: [
    ModalIcons,
  ],
  imports: [
    IonicPageModule.forChild(ModalIcons),
  ],
  exports: [
    ModalIcons
  ]
})
export class ModalIconsModule {}
