import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController} from 'ionic-angular';
import { ExpenseService } from '../../app/expense.service';
//import { Expense } from '../../app/expense.model';



@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class Detail {

 private expense;
 private categories: string[];
 

  constructor(private navCtrl: NavController,
              private navParms: NavParams,
              private expenseService: ExpenseService,
              private alertCtrl: AlertController) {
    this.categories = expenseService.categories;
    this.expense = {
        date:'',
        amount: 0,
        category:'',
        description: ''
    };

    const expense = navParms.get('expense');
    if(expense){   
      this.expense = expense;    
    }
    
  }

  onSave(){
    if(this.expense.$key){
      this.expenseService.updateExpense(this.expense);
    }else{
      this.expenseService.addExpense(this.expense);
    }
    this.navCtrl.pop();
  }

  onTrash(){
     let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: `Are you sure you want to delete this expense: "${this.expense.description}"?`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {        
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.expenseService.removeExpense(this.expense.$key);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

}
