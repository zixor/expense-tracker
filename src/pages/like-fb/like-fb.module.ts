import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LikeFB } from './like-fb';

@NgModule({
  declarations: [
    LikeFB,
  ],
  imports: [
    IonicPageModule.forChild(LikeFB),
  ],
  exports: [
    LikeFB
  ]
})
export class LikeFBModule {}
