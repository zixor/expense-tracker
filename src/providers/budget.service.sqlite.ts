import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BudgetModel } from '../models/Budget.model';


@Injectable()
export class BudgetSqliteService {

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
    let sql = 'CREATE TABLE IF NOT EXISTS budget(id INTEGER PRIMARY KEY AUTOINCREMENT, initialDate TEXT, finalDate TEXT, amount REAL, category TEXT)';
    this.sqlObject.executeSql(sql, {})
      .then(() => console.log('SQL Budgets Initialized'))
      .catch(e => console.log(e));

  }

  delete(budget:any) {

    let sql = 'DELETE FROM budget WHERE id=?';
    this.sqlObject.executeSql(sql, [budget.id]);

  }

  getAll(): Promise<any> {

    let budgets = [];

    let sql = "select * from budget";

    return new Promise((resolve, reject) => {
      this.sqlObject.executeSql(sql, [])
        .then(response => {
          for (let index = 0; index < response.rows.length; index++) {
            let record = response.rows.item(index);
            if (record) {
              budgets.push(record);
            }
          }
          resolve(budgets);
        })
        .catch(e => reject(e));
    });

  }


  update(budget: BudgetModel) {

    let sql = 'UPDATE budget SET initialDate = ?, finalDate = ?, amount= ?, category = ? WHERE id=?';
    this.sqlObject.executeSql(sql, [budget.initialDate, budget.finalDate, budget.amount, budget.category, budget.id]);

  }

  add(budget: BudgetModel) {
    return new Promise((resolve, reject) => {
      let sql = 'insert into budget ( initialDate, finalDate, amount, category ) values ( ?,?,?,? )';
      this.sqlObject.executeSql(sql, [budget.initialDate, budget.finalDate, budget.amount, budget.category])
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
