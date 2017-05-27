import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Expense } from '../app/expense.model';


@Injectable()
export class ExpenseSqliteService {
    
  private dbConfig = { name: 'data.db', location: 'default' };
  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.sqlite.create(this.dbConfig).then((db: SQLiteObject) => {
      this.db = db;
    });
  }

  initEnvironment() {

    let sql = 'CREATE TABLE IF NOT EXISTS expense(id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, amount REAL, category TEXT, description TEXT)';
    this.db.executeSql(sql, {})
    .then(() => console.log('Executed SQL'))
    .catch(e => console.log(e));

  }

  delete(expense: Expense) {

    let sql = 'DELETE FROM expense WHERE id=?';
    this.db.executeSql(sql, [expense.id]);

  }

  getAll(): Promise<any> {

    let expenses = [];
    let sql = 'SELECT * FROM expense';

    return new Promise((resolve, reject) => {
        this.db.executeSql(sql, [])
        .then(response => {
          for (let index = 0; index < response.rows.length; index++) {
            expenses.push(response.rows.item(index));
          }
          resolve(expenses);
        })
        .catch(e => reject(e));
    });

  }

  update(expense: Expense) {

    let sql = 'UPDATE expense SET date=?, amount=?, category=?, description=? WHERE id=?';
    this.db.executeSql(sql, [expense.date, expense.amount, expense.category, expense.description]);

  }

  add(expense: Expense){
    let sql = 'insert into expense ( date,amount,category, description ) values ( ?,?,?,? )';
    this.db.executeSql(sql, [expense.date, expense.amount, expense.category, expense.description]);
  }

  closeConnection() {
    this.db.close();
  }


}
