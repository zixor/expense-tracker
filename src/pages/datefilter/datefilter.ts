import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-datefilter',
  templateUrl: 'datefilter.html',
})
export class Datefilter {

  private filter = {
    initialDate: "",
    finalDate: ""
  }

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private viewCtl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Datefilter');
  }

  closeModal(){
    this.viewCtl.dismiss();
  }

}
