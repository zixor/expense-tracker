import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SavingModel } from "../../models/saving.model";
import { Savings } from '../savings/savings';

/**Imports services  */
import { SavingSqliteService } from '../../providers/savings.service.sqlite';
import { CategorySqliteService } from '../../providers/category.service.sqlite';

@Component({
  selector: 'page-list-savings',
  templateUrl: 'list-savings.html',
})
export class ListSavings {

  private savings: SavingModel[] = [];

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private savingService: SavingSqliteService,
    private categoryService: CategorySqliteService,
    private alertCtrl: AlertController) {

    this.loadData();

  }

  loadData() {
    let arrSavings = [];
    this.savingService.getAll().then(data => {
      if (data) {
        data.forEach(data => {
          let saving = data;
          this.categoryService.getCategory(saving.category)
            .then(category => {
              saving.category = category;
            });
          arrSavings.push(saving);
        });
      }
    });
    this.savings = arrSavings;
  }

  ionViewDidLoad() {
    this.loadData();
  }

  onAddClick() {
    this.navCtrl.push(Savings);
  }

  onClickSaving(saving: SavingModel) {
    this.navCtrl.push(Savings, {
      saving: saving
    });
  }


  doRefresh(refresher) {

    let arrSavings = [];
    this.savingService.getAll().then(data => {
      if (data) {
        data.forEach(data => {
          let saving = data;
          this.categoryService.getCategory(saving.category)
            .then(category => {
              saving.category = category;
            });
          arrSavings.push(saving);
        });
      }
      refresher.complete();
    })
      .catch(e => console.log(e));

    this.savings = arrSavings;

  }

  onTrash(saving: SavingModel) {
    let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: `Are you sure you want to delete this saving: "${saving.description}"?`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.savingService.delete(saving);
            this.loadData();
          }
        }
      ]
    });
    confirm.present();
  }

  showDetails(){
    console.log("showing list savings");
  }

  makeIncoming(){

  }

  makeWithDraw(){
    
  }

}
