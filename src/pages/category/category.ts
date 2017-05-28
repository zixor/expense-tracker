import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoryModel } from '../../app/category.model';


@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class Category {

  private category:CategoryModel;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.category = {
      id: 1,
      name:"",
      description:"",
      icon:"help",
      color:"light"
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Category');
  }

}
