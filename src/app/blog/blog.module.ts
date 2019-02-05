import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BlogPage } from './blog.page';
import { JandaiaAPIService } from '../jandaia-api.service';
import { HttpClientModule } from '@angular/common/http';
import { SppinerService } from '../sppiner.service';

const routes: Routes = [
  {
    path: '',
    component: BlogPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [BlogPage],
  providers: [
    JandaiaAPIService,
    SppinerService
  ]
})
export class BlogPageModule {}
