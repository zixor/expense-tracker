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

  private expenses: any[] = [];

  private balance: number = 0;
  private incomes: number = 0;
  private amountExpenses: number = 0;


  constructor(private navCtrl: NavController,
    private budgetService: BudgetSqliteService,
    private categoryService: CategorySqliteService,
    private alertCtrl: AlertController
  ) {

    this.initializeForm();

  }

  initializeForm() {
    this.setBalance();
    this.setExpenses();
    this.setIncomes();
    this.findAll();
  }

  setExpenses() {
    this.amountExpenses = this.expenseService.getExpenses();
  }

  setIncomes() {
    this.incomes = this.expenseService.getIncomes();
  }

  setBalance() {
    this.balance = this.incomes - this.amountExpenses;
  }

  findAll() {
    let arrExpenses = [];
    this.budgetService.getAll().then(budget => {
      if (budget) {
        budget.forEach(expense => {
          this.categoryService.getCategory(budget.category).then(category => {
            expense.category = category;
            arrExpenses.push(expense);
          });
        });
      }
      this.expenses = arrExpenses;
    });
  }

  ionViewWillEnter() {
    /* if(!this.isUserAlreadyLoggedIn()) {
             this.navCtrl.push(Login);
       }else{
         this.doRefresh(0);
     }*/
    this.initializeForm();
  }

  onItemClick(expense) {
    this.navCtrl.push(Detail, {
      expense: expense
    });
  }

  doRefresh(refresher) {
    /* this.expenseService.expenses.subscribe(data=>{
      this.expenses = data;
      if(refresher != 0){
        refresher.complete();
      }
    });  
    */
//TODO fix in expense also
    this.budgetService.getAll()
      .then(data => {
        this.expenses = data;
        refresher.complete();
      })
      .catch(e => console.log(e));
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
            this.findAll();
          }
        }
      ]
    });
    confirm.present();
  }


}
