import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SavingModel } from '../models/Saving.model';
import { DetailSavingModel } from '../models/detailsaving.model';


@Injectable()
export class SavingSqliteService {

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
    
    let sql = "CREATE TABLE IF NOT EXISTS SAVING(ID INTEGER PRIMARY KEY AUTOINCREMENT, CATEGORY TEXT, GOALDATE TEXT, DESCRIPTION TEXT)";                 
    this.sqlObject.executeSql(sql, {})
      .then(() => console.log('SQL Savings Initialized'))
      .catch(e => console.log(e));

    sql = "CREATE TABLE IF NOT EXISTS SAVINGDETAIL(ID INTEGER PRIMARY KEY AUTOINCREMENT,DATE TEXT, TYPE TEXT, AMOUNT REAL)";  
    this.sqlObject.executeSql(sql, {})
      .then(() => console.log('SQL Savings Initialized'))
      .catch(e => console.log(e));

  }

  delete(Saving: SavingModel) {

    let sql = 'DELETE FROM Saving WHERE id=?';
    this.sqlObject.executeSql(sql, [Saving.id]);

  }

  getAll(): Promise<any> {

    let Savings = [];

    let sql = "select * from Saving";

    return new Promise((resolve, reject) => {
      this.sqlObject.executeSql(sql, [])
        .then(response => {
          for (let index = 0; index < response.rows.length; index++) {
            let record = response.rows.item(index);
            if (record) {
              Savings.push(record);
            }
          }
          resolve(Savings);
        })
        .catch(e => reject(e));
    });

  }


  update(Saving: SavingModel) {

    let sql = 'UPDATE Saving SET category = ?, goalDate = ?, description = ?,  amount = ?, deposit = ? WHERE id=?';
    this.sqlObject.executeSql(sql, [Saving.category.id, Saving.goalDate, Saving.description, Saving.amount, Saving.deposit, Saving.id]);

  }

  add(Saving: SavingModel) {
    return new Promise((resolve, reject) => {
      let sql = 'insert into Saving ( category, goalDate, description,  amount, deposit ) values ( ?,?,?,?,? )';
      this.sqlObject.executeSql(sql, [Saving.category.id, Saving.goalDate, Saving.description, Saving.amount, Saving.deposit])
        .then(response => {
          resolve(response);
        })
        .catch(e => console.log(e));
    });
  }

  addDetail(detail: DetailSavingModel) {
    return new Promise((resolve, reject) => {
      let sql = 'INSERT INTO SAVINGDETAIL(DATE, TYPE, AMOUNT) VALUES (?,?,?)';
      this.sqlObject.executeSql(sql, [detail.date, detail.type, detail.amount])
        .then(response => {
          resolve(response);
        })
        .catch(e => console.log(e));
    });
  }

  deleteDetail(detail: DetailSavingModel) {
    return new Promise((resolve, reject) => {
      let sql = 'DELETE FROM SAVINGDETAIL WHERE ID = ?';
      this.sqlObject.executeSql(sql, [detail.id])
        .then(response => {
          resolve(response);
        })
        .catch(e => console.log(e));
    });
  }

  listDetails() : Promise<any> {

    let details = [];

    let sql = "SELECT * FROM SAVINGDETAIL ORDER BY date(date) DESC";

    return new Promise((resolve, reject) => {
      this.sqlObject.executeSql(sql, [])
        .then(response => {
          for (let index = 0; index < response.rows.length; index++) {
            let record = response.rows.item(index);
            if (record) {
              details.push(record);
            }
          }
          resolve(details);
        })
        .catch(e => reject(e));
    });

  }

  closeConnection() {
    this.sqlObject.close();
  }


}
