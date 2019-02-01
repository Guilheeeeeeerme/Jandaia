import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContaPage } from './conta.page';
import { SppinerService } from '../sppiner.service';
import { WpLoginService } from '../wp-login.service';

const routes: Routes = [
  {
    path: '',
    component: ContaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContaPage],
  providers: [
    SppinerService,
    WpLoginService
  ]
})
export class ContaPageModule {}
