import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ExpenseService } from './expense.service';
import { ArticleService } from './article.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Detail } from '../pages/detail/detail';
import { Login } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { ListArticle } from '../pages/list-article/list-article';
import { ArticlePage } from '../pages/article-page/article-page';

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
    IonicModule.forRoot(MyApp)
    , AngularFireModule.initializeApp(firebaseConfig, 'weonsoft-pos') 
    , AngularFireAuthModule
  ],
  declarations: [
    MyApp,
    HomePage,
    Detail,
    Login,
    ListPage,
    ListArticle,
    ArticlePage
  ],    
  entryComponents: [
    MyApp,
    HomePage,
    Detail,
    Login,
    ListPage,
    ListArticle,
    ArticlePage
  ],
  providers: [    
    ExpenseService,
    ArticleService,
    StatusBar,SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ],
  bootstrap: [IonicApp]
})
export class AppModule {}
