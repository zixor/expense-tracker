import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Detail } from '../detail/detail';
//import { Expense } from '../../app/expense.model';
import { ExpenseService } from '../../app/expense.service';
import { Login } from '../login/login';
//import { FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 private expenses: any[];
 private balance: number = 0;

  constructor(private navCtrl: NavController,
              private expenseService: ExpenseService
              ) {  }

  ionViewWillEnter(){
   /* if(!this.isUserAlreadyLoggedIn()) {
            this.navCtrl.push(Login);
      }else{
        this.doRefresh(0);
    }*/
  }

  onItemClick(expense){
      this.navCtrl.push(Detail,{
        expense : expense
      });
  }

  doRefresh(refresher){    
      this.expenseService.expenses.subscribe(data=>{
        this.expenses = data;
        if(refresher != 0){
          refresher.complete();
        }
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
