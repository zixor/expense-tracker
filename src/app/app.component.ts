import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Imports pages to Use
import { HomePage } from '../pages/home/home';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Settings } from '../pages/settings/settings';
import { Login } from '../pages/login/login';
import { ListCategory } from '../pages/list-category/list-category';
import { UserProfile } from "./user-profile.model";

//imports services
import { ExpenseSqliteService } from '../providers/expense.service.sqlite';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;

  private pages: Array<{title: string, component: any, icon: string}>;
  userProfile: UserProfile;


  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public events: Events,
              private sqlService: ExpenseSqliteService ) {

    this.initializeApp();

    this.userProfile = {
                          username: "",
                          uid: "",
                          photoURL: "",
                          displayName: ""
                      };

    // used for an example of ngFor and navigation
    this.pages = [
      
      { title: 'Dashboard', component: HomePage, icon:'pulse' },
      { title: 'Category',  component: ListCategory,  icon:'cube' },
      { title: 'Incomes',   component: Dashboard, icon:'flash' },  
      { title: 'Settings',  component: Settings, icon: 'hammer'} ,  
      { title: 'Log Out',   component: Login, icon: 'exit'} 
      
    ];

    this.events.subscribe("userProfile:changed", userProfile => {
        if(userProfile !== undefined){
           this.userProfile = userProfile;
        }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.sqlService.openDataBase();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  closeSession(){
      window.localStorage.removeItem("userProfile");
      this.nav.push( HomePage );
  }
}
