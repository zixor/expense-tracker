import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Calculator } from '../calculator/calculator';
import { ModalCategory } from '../modal-category/modal-category';
import { CategoryModel } from '../../models/category.model';
import { SavingModel } from '../../models/saving.model';
import { DetailSavingModel } from '../../models/detailsaving.model';
import * as moment from 'moment';

import { SavingSqliteService } from '../../providers/savings.service.sqlite';


@Component({
  selector: 'page-savings',
  templateUrl: 'savings.html',
})
export class Savings {

  private saving: SavingModel;
  private category: CategoryModel;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtl: ModalController,
    private savingService: SavingSqliteService) {


    const saving = this.navParams.get('saving');
    if (saving) {

      this.saving = saving;

    } else {

      this.category = {
        name: "",
        description: "",
        icon: "help",
        color: "light"
      };

      this.saving = {
        category: this.category,
        description: "",
        goalDate: "",
        amount: 0,
        creationDate: new Date().toString()
      }

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Savings');
  }


  setGoalDate(date) {
    this.saving.goalDate = moment(date).format("YYYY-MM-DD");
  }

  openCalc() {

    const modal = this.modalCtl.create(Calculator);
    modal.present();

    modal.onDidDismiss(value => {
      if (value) {
        this.saving.amount = value;
      }
    });
  }

  openModalCategory() {
    const modal = this.modalCtl.create(ModalCategory);
    modal.present();

    modal.onDidDismiss(category => {
      if (category) {
        this.category = category;
        this.saving.category = this.category;
      }
    });
  }

  onSave() {
    if (this.saving.id) {
      this.savingService.update(this.saving);
    } else {
      this.savingService.add(this.saving).then();
    }
    this.navCtrl.pop();
  }

  onTrash() {
    this.savingService.delete(this.saving);
  }

}
