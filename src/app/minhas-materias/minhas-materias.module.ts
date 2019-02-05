import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MinhasMateriasPage } from './minhas-materias.page';
import { SppinerService } from '../sppiner.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

const routes: Routes = [
  {
    path: '',
    component: MinhasMateriasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [SppinerService, LocalNotifications],
  declarations: [MinhasMateriasPage]
})
export class MinhasMateriasPageModule {}
