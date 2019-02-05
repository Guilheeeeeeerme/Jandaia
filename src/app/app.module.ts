import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { JandaiaAPIService } from './jandaia-api.service';
import { Facebook } from '@ionic-native/facebook/ngx';
import { FacebookLoginService } from './facebook-login.service';
import { ProductDetailsPageModule } from './product-details/product-details.module';
import { CrudEventPageModule } from './crud-event/crud-event.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SppinerService } from './sppiner.service';
import { BlogPostPageModule } from './blog-post/blog-post.module';
import { RegisterUserPageModule } from './register-user/register-user.module';

@NgModule({
  declarations: [AppComponent, LoginPageComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CrudEventPageModule,
    RegisterUserPageModule,
    ProductDetailsPageModule,
    BlogPostPageModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    JandaiaAPIService,
    Facebook,
    FacebookLoginService,
    SppinerService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
