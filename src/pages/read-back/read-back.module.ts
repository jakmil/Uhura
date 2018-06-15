import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadBackPage } from './read-back';

@NgModule({
  declarations: [
    ReadBackPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadBackPage),
  ],
})
export class ReadBackPageModule {}
