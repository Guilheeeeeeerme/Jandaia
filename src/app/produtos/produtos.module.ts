import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProdutosPage } from './produtos.page';
import { JandaiaAPIService } from '../jandaia-api.service';
import { HttpClientModule } from '@angular/common/http';
import { SppinerService } from '../sppiner.service';
import { SharedModule } from '../shared/shared.module';
import { HifenissuePipe } from '../hifenissue.pipe';

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
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    ProdutosPage
  ],
  exports: [HifenissuePipe],
  providers: [
    JandaiaAPIService,
    SppinerService
  ]
})
export class ProdutosPageModule {}
