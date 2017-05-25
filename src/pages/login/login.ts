import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { HomePage } from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class Login { 

  constructor(private navCtrl: NavController,
              public afAuth: AngularFireAuth,
              private events: Events 
              ) {
  }

  onTwitterLogin(){
    let self = this;
    this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider)
    .then(function(response){
            let user = {
                username: response.user.email,
                uid: response.user.uid,
                photoUrl: response.user.photoUrl,
                displayName: response.user.displayName
            };            
            window.localStorage.setItem('user', JSON.stringify(user));    
            self.navCtrl.push( HomePage , { user: user } ); 
    }).then(function(response){
       //console.log(response);
     });
  }

   onFacebookLogin(){
    let self = this;
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider)
    .then(function(response){
            let user = {
                username: response.user.email,
                uid: response.user.uid,
                photoUrl: response.user.photoUrl,
                displayName: response.user.displayName
            };            
            window.localStorage.setItem('user', JSON.stringify(user));    
            self.navCtrl.pop(); 
    }).then(function(response){
       //console.log(response);
     });
  }

   onGoogleLogin(){
   let self = this;
   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
   .then(function(response){
     //console.log(response);
           let userProfile = {
                username: response.user.email,
                uid: response.user.uid,
                photoUrl: response.user.photoURL,
                displayName: response.user.displayName
            };
            self.events.publish("userProfile:changed",userProfile);
            window.localStorage.setItem('userProfile', JSON.stringify(userProfile));    
            self.navCtrl.setRoot( HomePage ); 
    }); 
  }  

  singIn(){
    this.navCtrl.setRoot( HomePage );
  }

}
