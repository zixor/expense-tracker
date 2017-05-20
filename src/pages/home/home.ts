import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Detail } from '../detail/detail';
//import { Expense } from '../../app/expense.model';
import { ExpenseService } from '../../app/expense.service';
import { Login } from '../login/login';
import { FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 private expenses: FirebaseListObservable<any[]>;

  constructor(private navCtrl: NavController,
              private expenseService: ExpenseService
              ) {  }

  ionViewWillEnter(){
    if(!this.isUserAlreadyLoggedIn()) {
            this.navCtrl.push(Login);
      }else{
            this.expenses =  this.expenseService.getExpenses();
    }
  }

  onItemClick(expense){
      console.log(expense);
      this.navCtrl.push(Detail,{
        expense : expense
      });
  }

  onAddClick(){
    this.navCtrl.push(Detail);
  }

  isUserAlreadyLoggedIn(){
    let user = window.localStorage.getItem('userProfile');
    return user !== null;
  }


}
