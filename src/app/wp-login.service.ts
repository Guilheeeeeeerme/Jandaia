import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WPUsers } from './model/wp_users';

@Injectable({
  providedIn: 'root'
})
export class WpLoginService {

  private username: any;
  private password: any;
  isLoggedIn: boolean;
  users: WPUsers;
  path = 'wp-users';

  private baseUrl = 'http://jandaia.com/wp-json/myplugin/v1/login/';

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

  login(username: any, password: any, callback?, errorCallback?) {

    this.isLoggedIn = false;
    this.users = null;

    localStorage.setItem(this.path, JSON.stringify({
      username,
      password
    }));

    this._http.get(this.baseUrl +
      '?username=' + encodeURIComponent(username) +
      '&password=' + encodeURIComponent(password)
    ).subscribe((users: any) => {

      this.isLoggedIn = true;
      this.users = users.data;

      if (callback) {
        callback(users);
      }
    }, (error => {
      this.logout();

      if (errorCallback) {
        errorCallback(error);
      }

    }));
  }


}
