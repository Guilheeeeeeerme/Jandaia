import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WpLoginService {

  private username: any;
  private password: any;
  isLoggedIn: boolean;
  users: any;
  path = 'wp-users';

  private baseUrl = 'http://jandaia.com/wp-json/myplugin/v1/login/';

  constructor(private _http: HttpClient) {
    try {
      const a = JSON.parse(localStorage.getItem(this.path));
      this.username = a.username;
      this.password = a.password;
      this.login(this.username, this.password);
    } catch (error) {
      console.log(error);
    }

  }

  login(username: any, password: any, callback?) {
    this._http.get(this.baseUrl + '?username=' + username + '&password=' + password).subscribe((users) => {
      this.isLoggedIn = true;
      this.users = users;
      if (callback) {
        callback(users);
      }
    });
  }

}
