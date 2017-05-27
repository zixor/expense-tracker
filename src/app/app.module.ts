import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DatePickerModule } from 'datepicker-ionic2';
//import { SQLite } from '@ionic-native/sqlite';

//import { ExpenseSqliteService } from '../providers/expense.service.sqlite';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Detail } from '../pages/detail/detail';
import { Login } from '../pages/login/login';
//Imports pages to Use
import { Dashboard } from '../pages/dashboard/dashboard';
import { Settings } from '../pages/settings/settings';




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
    AngularFireDatabaseModule,
    DatePickerModule,
  ],
  declarations: [
    MyApp,
    HomePage,
    Detail,
    Login,
    Dashboard,   
    Settings
  ],    
  entryComponents: [
    MyApp,
    HomePage,
    Detail,
    Login,    
    Dashboard,
    Settings

  ],
  providers: [    
  //  ExpenseSqliteService,
    StatusBar,SplashScreen,
  //  SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ],
  bootstrap: [IonicApp]
})
export class AppModule {}
