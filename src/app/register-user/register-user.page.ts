import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {
  username: any;
  email: any;
  password: any;
  password_confirm: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }

  register() {
    this.modalCtrl.dismiss({
      username: this.username,
      email: this.email,
      password: this.password,
    });
  }

}
