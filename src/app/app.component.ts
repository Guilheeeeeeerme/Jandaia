import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
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
    private sppinerService: SppinerService,
    private alertCtrl: AlertController
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
    this.sppinerService.show();
    this.loginWasChecked = false;

    Promise.all([
      this.checkFb(),
      this.checkWp()
    ]).finally(() => {
      this.loginWasChecked = true;
      this.sppinerService.hide();
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
    this.sppinerService.show();
    this.facebookLoginService.logout().then(() => {
      this.fb_isLoggedIn = this.facebookLoginService.isLoggedIn;
      this.fb_users = this.facebookLoginService.users;
      this.checkLogin();
    }).finally(() => {
      this.sppinerService.hide();
    });
  }

  logoutWp() {
    this.sppinerService.show();
    this.wpLoginService.logout().then(() => {
      this.wp_isLoggedIn = this.wpLoginService.isLoggedIn;
      this.wp_users = this.wpLoginService.users;
      this.checkLogin();
    }).finally(() => {
      this.sppinerService.hide();
    });
  }

  registerWp(data) {
    this.sppinerService.show();
    this.wpLoginService.register(data.username, data.email, data.password, () => {
      this.sppinerService.hide();

      this.loginWp({
        username: data.username,
        password: data.password,
      });
      // this.wp_isLoggedIn = !!this.wpLoginService.isLoggedIn;
      // this.wp_users = this.wpLoginService.users;
    }, (error) => {
      this.sppinerService.hide();
      this.showError(error);
    });
  }

  loginWp(data) {
    this.sppinerService.show();
    this.wpLoginService.login(data.username, data.password, () => {
      this.sppinerService.hide();
      this.wp_isLoggedIn = !!this.wpLoginService.isLoggedIn;
      this.wp_users = this.wpLoginService.users;
    }, (error) => {
      this.sppinerService.hide();
      this.showError(error);
    });
  }

  loginFb() {
    this.sppinerService.show();
    this.facebookLoginService.login().then(() => {
      this.fb_isLoggedIn = !!this.facebookLoginService.isLoggedIn;
      this.fb_users = this.facebookLoginService.users;
    }).finally(() => {
      this.sppinerService.hide();
    });
  }

  async showError(error) {

    const alert = await this.alertCtrl.create({
      header: 'Erro',
      message: error.message,
      buttons: ['Dismiss']
    });

    await alert.present();
  }


}
