import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Detail } from '../detail/detail';
import { BudgetSqliteService } from '../../providers/budget.service.sqlite';
import { CategorySqliteService } from '../../providers/category.service.sqlite';
import { Login } from '../login/login';
import { DatePicker } from 'ionic2-date-picker/ionic2-date-picker';
import { BudgetModel } from '../../models/budget.model';

@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html'
})
export class Budget {

  constructor(private navCtrl: NavController,
    private budgetService: BudgetSqliteService,
    private categoryService: CategorySqliteService,
    private alertCtrl: AlertController
  ) {


  }


  ionViewWillEnter() {
 

  }

  onItemClick(expense) {
    this.navCtrl.push(Detail, {
      expense: expense
    });
  }

  doRefresh(refresher) {
   
  }

  onAddClick() {
    this.navCtrl.push(Detail);
  }


  onTrash(budget:BudgetModel) {
    console.log("onTrash");
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
