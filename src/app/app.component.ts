import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FacebookLoginService } from './facebook-login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Produtos Jandaia',
      url: '/produtos',
      icon: 'logo-buffer'
    },
    {
      title: 'Conta',
      url: '/conta',
      icon: 'contact'
    },
    {
      title: 'Calendário de Provas',
      url: '/agenda',
      icon: 'calendar'
    },
    {
      title: 'Minhas Matérias',
      url: '/minhas-materias',
      icon: 'grid'
    },
    {
      title: 'Blog',
      url: '/blog',
      icon: 'paper'
    },
    {
      title: 'Jogo',
      url: '/jogo',
      icon: 'logo-game-controller-a'
    },
    {
      title: 'Sobre nós',
      url: '/about',
      icon: 'information-circle-outline'
    }
  ];
  isLoggedIn: boolean;
  users: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private facebookLoginService: FacebookLoginService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.facebookLoginService.getLoginStatus().then(() => {
        this.isLoggedIn = this.facebookLoginService.isLoggedIn;
        this.users = this.facebookLoginService.users;
      });

    });
  }

  loginFb() {
    this.facebookLoginService.loginFb().then(() => {
      this.isLoggedIn = this.facebookLoginService.isLoggedIn;
      this.users = this.facebookLoginService.users;
    });
  }

  logoutFb() {
    this.facebookLoginService.logoutFb().then(() => {
      this.isLoggedIn = this.facebookLoginService.isLoggedIn;
      this.users = this.facebookLoginService.users;
    });
  }
}
