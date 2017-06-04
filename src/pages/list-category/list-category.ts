import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CategoryModel } from '../../app/category.model';
import { Category } from '../category/category';

/**Imports services  */
import { CategorySqliteService } from '../../providers/category.service.sqlite';



@Component({
  selector: 'page-list-category',
  templateUrl: 'list-category.html',
})
export class ListCategory {

  private categories: CategoryModel[] = [];

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private categoryService: CategorySqliteService,
    private alertCtrl: AlertController) {

     this.categoryService.getAll().then(data => {
      this.categories = data;
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListCategory');
  }

  onAddClick() {
    this.navCtrl.push(Category);
  }

  editCategory(category) {
    this.navCtrl.push(Category, {
      category: category
    });
  }


  doRefresh(refresher) {
    this.categoryService.getAll()
      .then(data => {
        this.categories = data;
        refresher.complete();
      })
      .catch(e => console.log(e));
  }

  onTrash(category){
    console.log("On trash category");
      let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: `Are you sure you want to delete this category: "${category.description}"?`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.categoryService.delete(category);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

}
