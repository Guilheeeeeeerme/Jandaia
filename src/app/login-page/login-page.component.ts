import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SppinerService } from '../sppiner.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // tslint:disable-next-line:no-output-rename
  @Output('loginWp') _loginWp = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-rename
  @Output('loginFb') _loginFb = new EventEmitter<any>();

  username: any;
  password: any;

  constructor(private sppinerService: SppinerService) { }

  ngOnInit() {

    // lucas, comenta essa trecho antes de buildar
    this.username = 'guilherme';
    this.password = '6(g^O8Q&TMH%Vbwh)(PcUj3Q';

    this.sppinerService.hide();
  }

  loginWp() {

    const data = {
      username: this.username,
      password: this.password
    };

    console.log(data);

    this._loginWp.emit(data);
  }

  loginFb() {
    this._loginFb.emit();
  }

}

