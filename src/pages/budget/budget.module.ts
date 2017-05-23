import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Budget } from './budget';

@NgModule({
  declarations: [
    Budget,
  ],
  imports: [
    IonicPageModule.forChild(Budget),
  ],
  exports: [
    Budget
  ]
})
export class BudgetModule {}
