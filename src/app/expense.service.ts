
import  uuidV4 from 'uuid/v4';
import  Dexie from 'dexie';
import { Expense } from './expense.model';

export class ExpenseService extends Dexie {

    expenses: Dexie.Table<Expense,string>;

    categories = ['Food','Travel','Other'];

    constructor(){
      //database name
      super('expense_tracker');
      this.version(1).stores({
        //Key value and index fields
         expenses: 'id,date'
      });
    }

  getExpense(expenseId: string): Dexie.Promise<Expense>{
    return this.expenses.get(expenseId);
  }

  updateExpense(expense: Expense){    
    this.expenses.update(expense.id,expense);
  }

  addExpense(expense: Expense){
    expense.id = uuidV4();
    this.expenses.add(expense);
  }

  removeExpense(expenseId: string){
    this.expenses.delete(expenseId);
  }

  getExpenses(): Dexie.Promise<Expense[]>{
    return this.expenses.toArray();
  }
}