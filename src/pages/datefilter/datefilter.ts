import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

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
    this.viewCtl.dismiss(this.filter);
  }

  setInitialDate(date){
    this.filter.initialDate = moment(date).format("YYYY-MM-DD");
  }

  setFinalDate(date){
    this.filter.finalDate = moment(date).format("YYYY-MM-DD");
  }

  onApply(){
    this.closeModal();
  }

}
