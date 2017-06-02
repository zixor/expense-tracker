import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Detail } from '../detail/detail';
//import { Expense } from '../../app/expense.model';
import { ExpenseSqliteService } from '../../providers/expense.service.sqlite';
import { Login } from '../login/login';
//import { FirebaseListObservable  } from 'angularfire2/database';
import { DatePicker } from 'ionic2-date-picker/ionic2-date-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private expenses: any[] = [];
  private balance: number = 0;


  constructor(private navCtrl: NavController,
    private expenseService: ExpenseSqliteService,
    private alertCtrl: AlertController
  ) {    
      this.findAll();
  }

  findAll(){
    this.expenseService.getAll().then(data => {      
      this.expenses = data;
    });
  }

  ionViewWillEnter() {
    /* if(!this.isUserAlreadyLoggedIn()) {
             this.navCtrl.push(Login);
       }else{
         this.doRefresh(0);
     }*/
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

    this.expenseService.getAll()
      .then(data => { 
        this.expenses = data;
        refresher.complete();
      })
      .catch(e => console.log(e));
  }

  onAddClick() {
    this.navCtrl.push(Detail);
  }

  isUserAlreadyLoggedIn() {
    let user = window.localStorage.getItem('userProfile');
    return user !== null;
  }

  onTrash(expense){
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
