import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPage } from './product-details.page';
import { SppinerService } from '../sppiner.service';
import { SharedModule } from '../shared/shared.module';
import { HifenissuePipe } from '../hifenissue.pipe';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [SppinerService],
  declarations: [
    ProductDetailsPage
  ],
  exports: [
    HifenissuePipe
  ],
})
export class ProductDetailsPageModule {}
