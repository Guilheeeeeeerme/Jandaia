import { Component, OnInit } from '@angular/core';
import { Compromisso } from '../model/compromisso.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-crud-event',
  templateUrl: './crud-event.page.html',
  styleUrls: ['./crud-event.page.scss'],
})
export class CrudEventPage implements OnInit {

  action;
  mode;
  event: Compromisso;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async adicionar() {
    this.modalCtrl.dismiss({
      action: 'create',
      event: this.event
    });
  }

  sair() {
    this.modalCtrl.dismiss({
      action: 'dismiss',
      event: this.event
    });
  }

}
