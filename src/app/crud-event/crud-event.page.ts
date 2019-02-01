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
  eventDia: any;

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  dataChanged(dayOfTheWeek) {
    this.fizDate(dayOfTheWeek);
    this.fizDate(dayOfTheWeek);
  }

  fizDate(dayOfTheWeek) {
    const at: Date = new Date(this.event.at);
    const currentDay = at.getDay();
    console.log(currentDay, at);
    const distance = dayOfTheWeek - currentDay;
    at.setDate(at.getDate() + distance);

    this.event.at = new Date(at).toISOString();
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
