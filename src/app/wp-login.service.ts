import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WPUsers } from './model/wp_users';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WpLoginService {

  private username: any;
  private password: any;
  isLoggedIn: boolean;
  users: WPUsers;
  path = 'wp-users';

  private baseUrl = 'http://jandaia.com/wp-json/myplugin/v1/';

  constructor(private _http: HttpClient) { }

  getLoginStatus() {
    return new Promise((resolve, reject) => {
      try {
        this.isLoggedIn = false;
        this.users = null;
        const loginInfo = JSON.parse(localStorage.getItem(this.path));
        this.username = loginInfo.username;
        this.password = loginInfo.password;
        this.login(this.username, this.password, resolve, resolve);
      } catch (error) {
        resolve();
        // console.log(error);
      }

    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.isLoggedIn = false;
      this.users = null;
      localStorage.removeItem(this.path);
      resolve();
    });
  }

  register(username: any, email: any, password: any, callback?, errorCallback?) {

    this._http.post(this.baseUrl + 'register/', {
      username: username,
      email: email,
      password: password,
    }).subscribe((response: any) => {
      if (callback) {
        callback(response.error);
      }
    }, (response => {
      this.logout();

      if (errorCallback) {
        errorCallback(response.error);
      }
    }));
  }

  login(username: any, password: any, callback?, errorCallback?) {

    this.isLoggedIn = false;
    this.users = null;

    localStorage.setItem(this.path, JSON.stringify({
      username,
      password
    }));

    // this._http.get(this.baseUrl + 'login/' +
    //   '?username=' + encodeURIComponent(username) +
    //   '&password=' + encodeURIComponent(password)
    // ).subscribe((users: any) => {

    this._http.post(this.baseUrl + 'login/', {
      username: username,
      password: password,
    }).subscribe((users: any) => {

      this.isLoggedIn = true;
      this.users = users.data;

      if (callback) {
        callback(users);
      }
    }, (response => {
      this.logout();

      if (errorCallback) {
        errorCallback(response.error);
      }

    }));
  }


}
