import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Detail } from '../pages/detail/detail';
import { Login } from '../pages/login/login';
import { UserProfile } from "./user-profile.model";
import { ListArticle } from "../pages/list-article/list-article";

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
      { title: 'Tablero',   component: HomePage },
      { title: 'Caja',      component: Login },
      { title: 'Artículos', component: ListArticle },
      { title: 'Empleados', component: Login },
      { title: 'Clientes',  component: Login },
      { title: 'Ventas',    component: ListPage },      
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
