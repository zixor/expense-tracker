import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoryModel } from '../../app/category.model';
import { Category } from '../category/category';


@Component({
  selector: 'page-list-category',
  templateUrl: 'list-category.html',
})
export class ListCategory {

  private categories: CategoryModel[] = [];

  constructor(private navCtrl: NavController,
              private navParams: NavParams) {

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
    this.navCtrl.push(Category);
  }

  editCategory(category){
    console.log(category);
  }


  doRefresh(refresher) {

  }

}
