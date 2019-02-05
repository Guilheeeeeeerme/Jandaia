import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JogoPage } from './jogo.page';
import { SppinerService } from '../sppiner.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

const routes: Routes = [
  {
    path: '',
    component: JogoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [SppinerService, ScreenOrientation],
  declarations: [JogoPage]
})
export class JogoPageModule {}
