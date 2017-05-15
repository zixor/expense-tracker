import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Detail } from '../detail/detail';
import { Expense } from '../../app/expense.model';
import { ExpenseService } from '../../app/expense.service';
import { Login } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 private expenses: Expense[];

  constructor(private navCtrl: NavController,
              private expenseService: ExpenseService
              ) {  }

  ionViewWillEnter(){
    if(!this.isUserAlreadyLoggedIn()) {
            this.navCtrl.push(Login);
      }else{
            this.expenseService.getExpenses()
                .then(expenses => this.expenses = expenses );
    }
  }

  onItemClick(expense){
      console.log(expense);
      this.navCtrl.push(Detail,{
        expenseId: expense.id
      });
  }

  onAddClick(){
    this.navCtrl.push(Detail);
  }

  isUserAlreadyLoggedIn(){
    let user = window.localStorage.getItem('user');
    return user !== null;
  }


}
