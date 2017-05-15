import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class Login { 

  constructor(private navCtrl: NavController
              ,public afAuth: AngularFireAuth
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
            console.log(user);
            window.localStorage.setItem('user', JSON.stringify(user));    
            self.navCtrl.pop(); 
    }).then(function(response){
       console.log(response);
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
            console.log(user);
            window.localStorage.setItem('user', JSON.stringify(user));    
            self.navCtrl.pop(); 
    }).then(function(response){
       console.log(response);
     });
  }

   onGoogleLogin(){
   let self = this;
   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
   .then(function(response){
     console.log(response);
           let user = {
                username: response.user.email,
                uid: response.user.uid
            };
            window.localStorage.setItem('user', JSON.stringify(user));    
            self.navCtrl.pop(); 
    }); 
  }  

}
