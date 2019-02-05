import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FacebookLoginService } from './facebook-login.service';
import { WpLoginService } from './wp-login.service';
import { WPUsers } from './model/wp_users';
import { SppinerService } from './sppiner.service';

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
    // {
    //   title: 'Jogo',
    //   url: '/jogo',
    //   icon: 'logo-game-controller-a'
    // },
    {
      title: 'Sobre nós',
      url: '/about',
      icon: 'information-circle-outline'
    }
  ];

  fb_users: any;
  wp_users: WPUsers;
  fb_isLoggedIn: boolean;
  wp_isLoggedIn: boolean;
  loginWasChecked: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private facebookLoginService: FacebookLoginService,
    private wpLoginService: WpLoginService,
    private sppinerService: SppinerService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.checkLogin();

    });
  }

  private checkLogin() {
    this.loginWasChecked = false;
    this.sppinerService.show();

    Promise.all([
      this.checkFb(),
      this.checkWp()
    ]).finally(() => {
      this.sppinerService.hide();
      this.loginWasChecked = true;
      // console.log('fb_checkedLogin: ' + this.fb_checkedLogin);
      // console.log('fb_isLoggedIn: ' + this.fb_isLoggedIn);
      // console.log('fb_users: ' + this.fb_users);
      // console.log('wp_checkedLogin: ' + this.wp_checkedLogin);
      // console.log('wp_isLoggedIn: ' + this.wp_isLoggedIn);
      // console.log('wp_users: ' + this.wp_users);
    });

  }

  private checkFb() {

    return new Promise((resolve, reject) => {

      try {

        this.facebookLoginService.getLoginStatus()
          .finally(() => {
            this.doneFb();
            resolve();
          });

      } catch (error) {
        this.doneFb();
        resolve();
      }
    });
  }

  private checkWp() {

    return new Promise((resolve, reject) => {

      try {

        this.wpLoginService.getLoginStatus()
          .finally(() => {
            this.doneWp();
            resolve();
          });

      } catch (error) {
        this.doneWp();
        resolve();
      }

    });

  }

  private doneFb() {
    this.fb_isLoggedIn = !!this.facebookLoginService.isLoggedIn;
    this.fb_users = this.facebookLoginService.users;
  }

  private doneWp() {
    this.wp_isLoggedIn = !!this.wpLoginService.isLoggedIn;
    this.wp_users = this.wpLoginService.users;
  }

  logoutFb() {
    this.facebookLoginService.logout().then(() => {
      this.fb_isLoggedIn = this.facebookLoginService.isLoggedIn;
      this.fb_users = this.facebookLoginService.users;
      this.checkLogin();
    });
  }

  logoutWp() {
    this.wpLoginService.logout().then(() => {
      this.wp_isLoggedIn = this.wpLoginService.isLoggedIn;
      this.wp_users = this.wpLoginService.users;
      this.checkLogin();
    });
  }

  loginWp(data) {
    this.wpLoginService.login(data.username, data.password, () => {
      this.wp_isLoggedIn = !!this.wpLoginService.isLoggedIn;
      this.wp_users = this.wpLoginService.users;
    });
  }

  loginFb() {
    this.facebookLoginService.login().then(() => {
      this.fb_isLoggedIn = !!this.facebookLoginService.isLoggedIn;
      this.fb_users = this.facebookLoginService.users;
    });
  }


}
