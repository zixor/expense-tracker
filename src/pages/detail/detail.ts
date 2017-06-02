import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ExpenseSqliteService } from '../../providers/expense.service.sqlite';
import { Expense } from '../../app/expense.model';
import * as moment from 'moment';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class Detail {

  private expense;
  private categories: string[];
  private base64Image: string;

  private options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  private optionsGallery = {
    maximumImagesCount: 1,
    width: 500,
    height: 500,
    quality: 75
  };

  constructor(private navCtrl: NavController,
    private navParms: NavParams,
    private expenseService: ExpenseSqliteService,
    private alertCtrl: AlertController,
    private camera: Camera,
    private imagePicker: ImagePicker
  ) {
    this.categories = ['Food', 'Travel', 'Other'];
    this.expense = {
      date: '',
      amount: 0,
      category: '',
      description: ''
    };

    const expense = navParms.get('expense');
    if (expense) {
      this.expense = expense;
    }


  }

  setDate(date) {
    // this.expense.date = moment(date).format("MMM Do YYYY");   
    this.expense.date = moment(date).format("YYYY-MM-DD");
  }



  onSave() {
    /*  let userProfile = JSON.parse(window.localStorage.getItem("userProfile"));
      this.expense.user = userProfile.username;
      this.expense.photoUrl = userProfile.photoUrl;*/
    if (this.expense.id) {
      this.expenseService.update(this.expense);
    } else {
      this.expenseService.add(this.expense);
    }
    this.navCtrl.pop();
  }

  onTrash() {
    let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: `Are you sure you want to delete this expense: "${this.expense.description}"?`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.expenseService.delete(this.expense);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  choosePicture() {
    this.imagePicker.getPictures(this.optionsGallery).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }

}
