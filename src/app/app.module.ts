import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { StatusBar } from '@ionic-native/status-bar';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { DatePickerModule } from 'datepicker-ionic2';
import { SQLite } from '@ionic-native/sqlite';

import { ExpenseSqliteService } from '../providers/expense.service.sqlite';
import { CategorySqliteService } from '../providers/category.service.sqlite';
import { BudgetSqliteService } from '../providers/budget.service.sqlite';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Detail } from '../pages/detail/detail';
import { Login } from '../pages/login/login';
import { ListCategory } from '../pages/list-category/list-category';
import { Category } from '../pages/category/category';
import { ModalColors } from '../pages/modal-colors/modal-colors';
import { ModalIcons } from '../pages/modal-icons/modal-icons';
import { ModalCategory } from '../pages/modal-category/modal-category';
import { ListBudget } from '../pages/list-budget/list-budget';
import { Budget } from '../pages/budget/budget';


//Imports pages to Use
import { Dashboard } from '../pages/dashboard/dashboard';
import { Settings } from '../pages/settings/settings';




export const firebaseConfig = {
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
    Settings,
    ListCategory,
    Category,
    ModalColors,
    ModalIcons,
    ModalCategory,
    ProgressBarComponent
  ],
  entryComponents: [
    MyApp,
    HomePage,
    Detail,
    Login,
    Dashboard,
    Settings,
    ListCategory,
    Category,
    ModalColors,
    ModalIcons,
    ModalCategory
  ],
  providers: [
    ExpenseSqliteService,
    CategorySqliteService,
    BudgetSqliteService,
    StatusBar,
    SplashScreen,
    SQLite,
    File,
    Transfer,
    Camera,
    FilePath,
    ImagePicker,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  bootstrap: [IonicApp]
})
export class AppModule { }
