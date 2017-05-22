import { SQLite } from 'ionic-native';
import { Expense } from './expense.model';

export class ExpenseService {

// public properties

  db: SQLite = null;

  constructor() {
    this.db = new SQLite();
  }

  // public methods

  create(expense: Expense){
    let sql = 'INSERT INTO expense(date, amount, category, description) VALUES(?,?,?,?)';
    return this.db.executeSql(sql, [expense.date, expense.amount, expense.category, expense.description]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS expense(id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, amount REAL, category TEXT, description TEXT)';
    return this.db.executeSql(sql, []);
  }

  delete(expense: Expense){
    let sql = 'DELETE FROM expense WHERE id=?';
    return this.db.executeSql(sql, [expense.id]);
  }

  getAll(){
    let sql = 'SELECT * FROM expense';
    return this.db.executeSql(sql, [])
    .then(response => {
      let expenses = [];
      for (let index = 0; index < response.rows.length; index++) {
        expenses.push( response.rows.item(index) );
      }
      return Promise.resolve( expenses );
    })
  }

  openDatabase(){
    return this.db.openDatabase({
      name: 'expenses.db',
      location: 'default' // This location correspond to the application default path
    });
  }

  update(expense: Expense){
    let sql = 'UPDATE expenses SET date=?, amount=?, category=?, description=? WHERE id=?';
    return this.db.executeSql(sql, [expense.date, expense.amount, expense.category, expense.description]);
  }


}