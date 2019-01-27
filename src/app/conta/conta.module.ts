import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';

import { IonicModule } from '@ionic/angular';

import { ContaPage } from './conta.page';

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
    RouterModule.forChild(routes),
  ],
  declarations: [ContaPage],
  providers: [
    Facebook
  ]
})
export class ContaPageModule {}
