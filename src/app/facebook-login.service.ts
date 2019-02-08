import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';

@Injectable({
  providedIn: 'root'
})
export class FacebookLoginService {
  isLoggedIn: boolean;
  users: any;

  constructor(private fb: Facebook) {}

  getLoginStatus() {

    return new Promise((resolve, reject) => {
      this.isLoggedIn = false;

      this.fb.getLoginStatus()
        .then(res => {
          // alert(JSON.stringify(res));
          if (res.status === 'connect' || res.status === 'connected') {
            this.isLoggedIn = true;
            this.getUserDetail(res.authResponse.userID)
              .then(resolve)
              .catch(reject);
          } else {
            resolve(res);
          }
        })
        .catch((e) => {
          // alert(e.message);
          reject(e);
        });

    });
  }

  login() {
    this.isLoggedIn = false;

    return new Promise((resolve, reject) => {

      this.fb.login(['public_profile', 'user_friends', 'email'])
        .then(res => {
          if (res.status === 'connected') {
            this.isLoggedIn = true;
            this.getUserDetail(res.authResponse.userID)
              .then(resolve)
              .catch(reject);
          } else {
            reject(res);
          }
        })
        .catch(e => reject(e));

    });
  }

  getUserDetail(userID: string): any {

    return new Promise((resolve, reject) => {

      this.fb.api('/' + userID + '/?fields=id,email,name,picture,gender', ['public_profile'])
        .then(res => {
          this.users = res;
          resolve();
        })
        .catch(e => {
          reject(e);
        });

    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.fb.logout()
        .then(res => {
          this.isLoggedIn = false;
          resolve(res);
        })
        .catch(e => reject(e));
    });
  }
}
