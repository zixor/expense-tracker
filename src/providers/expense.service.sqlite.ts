import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Expense } from '../app/expense.model';


@Injectable()
export class ExpenseSqliteService {

  private dbConfig = { name: 'data.db', location: 'default' };
  private db: SQLite = null;
  private sqlObject: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.db = new SQLite();
  }

  openDataBase() {
    this.db.create(this.dbConfig).then((sqlObject: SQLiteObject) => {
      this.sqlObject = sqlObject;
      this.createTable();
    }).catch(e => console.log(e));
  }

  createTable() {
    let sql = 'CREATE TABLE IF NOT EXISTS expense(id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, amount REAL, category TEXT, description TEXT, image TEXT, incoming TEXT)';
    this.sqlObject.executeSql(sql, {})
      .then(() => console.log('SQL Expenses Initialized'))
      .catch(e => console.log(e));

  }

  delete(expense: Expense) {

    let sql = 'DELETE FROM expense WHERE id=?';
    this.sqlObject.executeSql(sql, [expense.id]);

  }

  getAll(): Promise<any> {

    let expenses = [];
    let sql = 'SELECT * FROM expense';

    return new Promise((resolve, reject) => {
      this.sqlObject.executeSql(sql, [])
        .then(response => {
          for (let index = 0; index < response.rows.length; index++) {
            let expense = response.rows.item(index);
            if (expense !== undefined) {                          
              expenses.push(expense);
            }
          }
          resolve(expenses);
        })
        .catch(e => reject(e));
    });

  }

  getExpenses(): number {

    let expenses = 0;
    let sql = "SELECT sum(amount) FROM expense where incoming = false ";

    this.sqlObject.executeSql(sql, [])
      .then(response => {
        for (let index = 0; index < response.rows.length; index++) {
          let expenses = response.rows.item(index);
          if (expenses !== undefined) {
            console.log(expenses);
            expenses = expenses;
          }
        }

      });

    return expenses;

  }

  getIncomes(): number {

    let incomes = 0;
    let sql = "SELECT sum(amount) FROM expense where incoming = true ";

    this.sqlObject.executeSql(sql, [])
      .then(response => {
        for (let index = 0; index < response.rows.length; index++) {
          let incomes = response.rows.item(index);
          if (incomes !== undefined) {
            incomes = incomes;
            console.log(incomes);
          }
        }

      });
    return incomes;

  }

  update(expense: Expense) {

    let sql = 'UPDATE expense SET date=?, amount=?, category=?, description=?, image = ?, incoming = ? WHERE id=?';
    this.sqlObject.executeSql(sql, [expense.date, expense.amount, expense.category, expense.description, expense.image, expense.incoming, expense.id]);

  }

  add(expense: Expense) {
    return new Promise((resolve, reject) => {
      let sql = 'insert into expense ( date,amount,category, description, image, incoming ) values ( ?,?,?,?,?,? )';
      this.sqlObject.executeSql(sql, [expense.date, expense.amount, expense.category, expense.description, expense.image, expense.incoming])
        .then(response => {
          resolve(response);
        })
        .catch(e => console.log(e));
    });
  }

  closeConnection() {
    this.sqlObject.close();
  }


}
