import { Component, OnInit } from '@angular/core';
import { Compromisso } from '../model/compromisso.model';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';


@Component({
  selector: 'app-crud-event',
  templateUrl: './crud-event.page.html',
  styleUrls: ['./crud-event.page.scss'],
})
export class CrudEventPage implements OnInit {

  action;
  mode;
  event: Compromisso;
  dayOfTheWeek;

  actualTime;
  timezoneOffset: number;

  constructor(private modalCtrl: ModalController) {
    const d = new Date();
    this.timezoneOffset = d.getTimezoneOffset();
  }

  ngOnInit() {
    try {
      this.event.at = moment.utc(this.event.at).seconds(0).milliseconds(0).zone(this.timezoneOffset).format();
    } catch (error) {    }

    this.dayOfTheWeek = new Date(this.event.at).getDay();
  }

  dayOfTheWeekChanged(dayOfTheWeek) {
    const at: Date = new Date(this.event.at);
    const currentDay = at.getDay();
    console.log(currentDay, at);
    const distance = dayOfTheWeek - currentDay;
    at.setDate(at.getDate() + distance);

    this.event.at = new Date(at).toISOString();
  }

  async adicionar() {
    try { this.event.at = moment.utc(this.event.at).zone(this.timezoneOffset).format(); } catch (e) { console.error(e); }
    this.modalCtrl.dismiss({
      action: 'create',
      event: this.event
    });
  }

  sair() {
    try { this.event.at = moment.utc(this.event.at).zone(this.timezoneOffset).format(); } catch (e) { console.error(e); }
    this.modalCtrl.dismiss({
      action: 'dismiss',
      event: this.event
    });
  }

}
