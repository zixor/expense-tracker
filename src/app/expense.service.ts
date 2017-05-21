import { Injectable } from '@angular/core';
//import { Expense } from './expense.model';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

/** 
 * Warning for the correct using of this service, you must import { Injectable } from '@angular/core';
 * and use the annotation @Injectable(). Otherwise You Will get the folling exception:
 * 1. Can't resolve all parameters for ExpenseService: (?).
 * 
 * Readme : Any doubt about firebase https://github.com/angular/angularfire2/blob/master/docs/Auth-with-Ionic3-Angular4.md
 * 
*/
@Injectable()
export class ExpenseService {

    categories = ['Food','Travel','Other'];
    public expenses: FirebaseListObservable<any[]>;

    constructor(private afDB: AngularFireDatabase){
        this.expenses = this.afDB.list('/expenses');        
    }  

  updateExpense(expense): firebase.Promise<void>{    
    return this.expenses.update(expense.$key, expense);
  }

  addExpense(expense): firebase.Promise<void>{
   return this.expenses.push(expense);
  }

  removeExpense(expenseId): firebase.Promise<void>{  
   return this.expenses.remove(expenseId);
  }

  getExpenses() {
    return this.expenses;
  }
}