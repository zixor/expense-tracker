import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { CategoryModel } from '../../app/category.model';
import { Category } from '../category/category';

/**Imports services  */
import { CategorySqliteService } from '../../providers/category.service.sqlite';

@Component({
  selector: 'page-modal-category',
  templateUrl: 'modal-category.html',
})
export class ModalCategory {

  private categories: CategoryModel[] = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private categoryService: CategorySqliteService,
    private viewCtl: ViewController) {

    this.categoryService.getAll().then(data => {
      this.categories = data;
    });

  }

  ionViewDidLoad() {
    
  }

   onSelectedCategory(category) {
    this.viewCtl.dismiss(category);
  }

  closeModal(){
    this.viewCtl.dismiss();
  }

}
