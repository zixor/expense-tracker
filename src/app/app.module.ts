import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ExpenseService } from './expense.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Detail } from '../pages/detail/detail';
import { Login } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
//Imports pages to Use
import { Dashboard } from '../pages/dashboard/dashboard';
import { History } from '../pages/history/history';
import { Budget } from '../pages/budget/budget';
import { Waranty } from '../pages/waranty/waranty';
import { Backup } from '../pages/backup/backup';
import { Settings } from '../pages/settings/settings';
import { RateUs } from '../pages/rate-us/rate-us';
import { LikeFB } from '../pages/like-fb/like-fb';


export const firebaseConfig  = {
    apiKey: "AIzaSyCysMWhsNmcuXjwInzIRau887uJ1eGjAm4",
    authDomain: "weonsoft-pos.firebaseapp.com",
    databaseURL: "https://weonsoft-pos.firebaseio.com",
    projectId: "weonsoft-pos",
    storageBucket: "weonsoft-pos.appspot.com",
    messagingSenderId: "724728369366"
  };

@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, 'weonsoft-pos'),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    MyApp,
    HomePage,
    Detail,
    Login,
    ListPage,
    Dashboard, 
    History, 
    Budget,
    Waranty,
    Backup,
    Settings,
    RateUs,
    LikeFB
  ],    
  entryComponents: [
    MyApp,
    HomePage,
    Detail,
    Login,
    ListPage,
    History, 
    Budget,
    Waranty,
    Backup,
    Settings,
    RateUs,
    LikeFB
  ],
  providers: [    
    ExpenseService,
    StatusBar,SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ],
  bootstrap: [IonicApp]
})
export class AppModule {}
