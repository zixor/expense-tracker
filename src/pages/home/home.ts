import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Detail } from '../detail/detail';
import { ExpenseSqliteService } from '../../providers/expense.service.sqlite';
import { CategorySqliteService } from '../../providers/category.service.sqlite';
import { Login } from '../login/login';
import { DatePicker } from 'ionic2-date-picker/ionic2-date-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private expenses: any[] = [];

  private balance: number = 0;
  private incomes: number = 0;
  private amountExpenses: number = 0;


  constructor(private navCtrl: NavController,
    private expenseService: ExpenseSqliteService,
    private categoryService: CategorySqliteService,
    private alertCtrl: AlertController
  ) {

    this.initializeForm();

  }

  initializeForm() {
    this.setExpenses();
    this.setIncomes();
    this.findAll();
  }

  setExpenses() {
    this.expenseService.getExpenses().then(data => {
      this.amountExpenses = data;
      this.setBalance();
    });
  }

  setIncomes() {
    this.expenseService.getIncomes().then(data => {
      this.incomes = data;
      this.setBalance();
    });
  }

  setBalance() {
    this.balance = this.incomes - this.amountExpenses;
  }

  findAll() {
    let arrExpenses = [];
    return new Promise((resolve, reject) => {
      this.expenseService.getAll().then(data => {
        if (data) {
          data.forEach(expense => {
            this.categoryService.getCategory(expense.category).then(category => {
              expense.category = category;
              arrExpenses.push(expense);
            });
          });
          this.expenses = arrExpenses;
          resolve(true);
        }
      }).catch(e => reject(e));
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
    this.findAll().then(data => {
      if (data) {
        this.setExpenses();
        this.setIncomes();
        this.setBalance();
        refresher.complete();
      }
    });

  }

  onAddClick() {
    this.navCtrl.push(Detail);
  }

  isUserAlreadyLoggedIn() {
    let user = window.localStorage.getItem('userProfile');
    return user !== null;
  }

  onTrash(expense) {
    console.log("onTrash");
    let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: `Are you sure you want to delete this expense: "${expense.description}"?`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.expenseService.delete(expense);
            this.findAll();
          }
        }
      ]
    });
    confirm.present();
  }


}
