import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { CategoryModel } from '../../app/category.model';
import { ModalColors } from '../modal-colors/modal-colors';
import { ModalIcons } from '../modal-icons/modal-icons';


@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class Category {

  private category:CategoryModel;
  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private modalCtl: ModalController) {
    this.category = {
      id: 1,
      name:"",
      description:"",
      icon:"help",
      color:"light"
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Category');
  }

  onModalIcons(){
    console.log("modal");
    const modal = this.modalCtl.create(ModalIcons);
    modal.present();

    modal.onDidDismiss(iconName => {
        this.category.icon = iconName;
    });
  }

  openModalColors(){
    const modal = this.modalCtl.create(ModalColors);
    modal.present();

    modal.onDidDismiss(color => {
        this.category.color = color;
    });
  }

}
