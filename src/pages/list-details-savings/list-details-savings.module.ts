import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListDetailsSavings } from './list-details-savings';

@NgModule({
  declarations: [
    ListDetailsSavings,
  ],
  imports: [
    IonicPageModule.forChild(ListDetailsSavings),
  ],
  exports: [
    ListDetailsSavings
  ]
})
export class ListDetailsSavingsModule {}
