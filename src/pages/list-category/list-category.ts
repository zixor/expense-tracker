import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Category } from '../../app/category.model';


@Component({
  selector: 'page-list-category',
  templateUrl: 'list-category.html',
})
export class ListCategory {

  private categories: Category[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.categories.push({
      id: 1,
      name: "Fun",
      description: "Have Fun",
      icon: "game-controller-a",
      color: "primary"
    });

    this.categories.push({
      id: 2,
      name: "Food",
      description: "Meals",
      icon: "md-pizza",
      color: "danger"
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListCategory');
  }

  onItemClick() {

  }

  onAddClick() {

  }

  editCategory(category){
    console.log(category);
  }


  doRefresh(refresher) {

  }
}
