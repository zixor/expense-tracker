import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { Detail } from '../detail/detail';
import { BudgetSqliteService } from '../../providers/budget.service.sqlite';
import { CategorySqliteService } from '../../providers/category.service.sqlite';
import { Login } from '../login/login';
import { DatePicker } from 'ionic2-date-picker/ionic2-date-picker';
import { BudgetModel } from '../../models/budget.model';
import { CategoryModel } from '../../models/category.model';

import { ModalCategory } from '../modal-category/modal-category';

@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html'
})
export class Budget {

  private budget: BudgetModel;
  private category: CategoryModel;

  constructor(private navCtrl: NavController,
    private budgetService: BudgetSqliteService,
    private categoryService: CategorySqliteService,
    private modalCtl: ModalController,
    private alertCtrl: AlertController
  ) {

    var date = new Date();
    let lastDayCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
    this.budget.initialDate = date.setDate(1).toString();
    this.budget.finalDate = new Date(lastDayCurrentMonth).toString();
    this.budget.amount = 0;
    this.budget.category = "";

  }


  ionViewWillEnter() {


  }

  onItemClick(expense) {
    this.navCtrl.push(Detail, {
      expense: expense
    });
  } 

  onAddClick() {
    this.navCtrl.push(Detail);
  }


  onSave() {
    console.log(this.budget);
    if (this.budget.id) {
      this.budgetService.update(this.budget);
    } else {
      this.budgetService.add(this.budget);
    }
    this.navCtrl.pop();
  }

  openModalCategory() {
    const modal = this.modalCtl.create(ModalCategory);
    modal.present();

    modal.onDidDismiss(category => {
      this.category = category;
    });
  }

  onTrash(budget: BudgetModel) {
    let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: `Are you sure you want to delete this budget ?`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.budgetService.delete(budget);

          }
        }
      ]
    });
    confirm.present();
  }


}
