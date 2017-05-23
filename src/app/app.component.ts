import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Imports pages to Use
import { Dashboard } from '../pages/dashboard/dashboard';
import { History } from '../pages/history/history';
import { Budget } from '../pages/budget/budget';
import { Waranty } from '../pages/waranty/waranty';
import { Backup } from '../pages/backup/backup';
import { Settings } from '../pages/settings/settings';
import { RateUs } from '../pages/rate-us/rate-us';
import { LikeFB } from '../pages/like-fb/like-fb';

//import { ListPage } from '../pages/list/list';
//import { Detail } from '../pages/detail/detail';
import { Login } from '../pages/login/login';
import { UserProfile } from "./user-profile.model";
//import { ListArticle } from "../pages/list-article/list-article";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;

  pages: Array<{title: string, component: any}>;
  userProfile: UserProfile;


  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public events: Events ) {

    this.initializeApp();

    this.userProfile = {
                          username: "",
                          uid: "",
                          photoURL: "",
                          displayName: ""
                      };

    // used for an example of ngFor and navigation
    this.pages = [
      
      { title: 'Dashboard', component: Dashboard },
      { title: 'History',   component: History },
      { title: 'Budget',    component: Budget },
      { title: 'Waranty',   component: Waranty },
      { title: 'Backup',    component: Backup },
      { title: 'Settings',  component: Settings },
      { title: 'Rate Us',   component: RateUs },
      { title: 'Like us on FaceBook',   component: LikeFB },            
      { title: 'Exit',      component: Login },
      
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
