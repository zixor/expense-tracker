import { Component } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker';
import {
  ModalController, NavController, NavParams,
  AlertController, ActionSheetController, ToastController,
  Platform, LoadingController, Loading
} from 'ionic-angular';
import { ExpenseSqliteService } from '../../providers/expense.service.sqlite';
import { Expense } from '../../app/expense.model';
import * as moment from 'moment';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';

//Import modal page
import { ModalCategory } from '../modal-category/modal-category';

declare var cordova: any;

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class Detail {

  private expense: Expense;
  private pictures = [];
  private category;

  private lastImage: string = null;
  private loading: Loading;

  constructor(
    private navCtrl: NavController,
    private modalCtl: ModalController,
    private navParms: NavParams,
    private expenseService: ExpenseSqliteService,
    private alertCtrl: AlertController,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private platform: Platform,
    private loadingCtrl: LoadingController) {


    const expense = navParms.get('expense');

    if (expense) {

      this.expense = expense;
      this.lastImage = expense.image;
      this.category = expense.category;

    } else {

      this.initExpense();
      this.initCategory();

    }

  }

  private initExpense() {
    this.expense = {
      date: '',
      amount: 0,
      category: '',
      description: '',
      incoming: false
    };
  }

  private initCategory() {
    this.category = {
      name: "",
      description: "",
      icon: "cube",
      color: "add-item"
    };
  }

  private options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true
  };

  private optionsGallery = {
    maximumImagesCount: 1,
    width: 500,
    height: 500,
    quality: 75
  };

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: '   Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: '   Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
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
    console.log(this.expense);
    this.expense.image = this.lastImage;

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

  choosePicture() {
    this.imagePicker.getPictures(this.optionsGallery).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }


  openModalCategory() {

    const modal = this.modalCtl.create(ModalCategory);
    modal.present();

    modal.onDidDismiss(category => {
      console.log(category);
      this.category = category;
      this.expense.category = category.id;
    });

  }

  public uploadImage() {
    // Destination URL
    var url = "http://yoururl/upload.php";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }

}
