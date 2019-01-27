import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProdutosPage } from './produtos.page';
// import { JandaiaApiService } from '../jandaia-api.service';
import { AppModule } from '../app.module';
import { JandaiaAPIService } from '../jandaia-api.service';
import { HttpClientModule } from '@angular/common/http';
import { SppinerService } from '../sppiner.service';

const routes: Routes = [
  {
    path: '',
    component: ProdutosPage
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
  declarations: [ProdutosPage],
  providers: [
    JandaiaAPIService,
    SppinerService
  ]
})
export class ProdutosPageModule {}
