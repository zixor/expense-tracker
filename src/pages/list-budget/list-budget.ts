import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Budget } from '../budget/budget';
import { BudgetSqliteService } from '../../providers/budget.service.sqlite';
import { CategorySqliteService } from '../../providers/category.service.sqlite';
import { BudgetModel } from '../../models/budget.model';

@Component({
  selector: 'page-list-budget',
  templateUrl: 'list-budget.html'
})
export class ListBudget {

  private budgets: any[] = [];
  private loadProgress:number = 20;
  
  constructor(private navCtrl: NavController,
    private budgetService: BudgetSqliteService,
    private categoryService: CategorySqliteService,
    private alertCtrl: AlertController
  ) {
   

  }


  findAll() {
    let arrBudgets = [];
    this.budgetService.getAll().then(budget => {
      if (budget) {
        budget.forEach(expense => {
          this.categoryService.getCategory(budget.category).then(category => {
            expense.category = category;
            arrBudgets.push(expense);
          });
        });
      }
      this.budgets = arrBudgets;
    });
  }

  ionViewWillEnter() {   
     this.findAll();
  }

  onItemClick(budget) {
    this.navCtrl.push(Budget, {
      budget: budget
    });
  }

  doRefresh(refresher) {

    this.budgetService.getAll()
      .then(data => {
        this.budgets = data;
        refresher.complete();
      })
      .catch(e => console.log(e));

  }

  onAddClick() {
    this.navCtrl.push(Budget);
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
            this.findAll();
          }
        }
      ]
    });
    confirm.present();
  }


}
