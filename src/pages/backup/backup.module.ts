import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Backup } from './backup';

@NgModule({
  declarations: [
    Backup,
  ],
  imports: [
    IonicPageModule.forChild(Backup),
  ],
  exports: [
    Backup
  ]
})
export class BackupModule {}
