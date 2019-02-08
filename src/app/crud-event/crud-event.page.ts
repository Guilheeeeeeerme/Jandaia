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
  now: Date;
  eventAt: any;

  constructor(private modalCtrl: ModalController) {
    const d = new Date();
    this.timezoneOffset = d.getTimezoneOffset();
  }

  ngOnInit() {

    this.now = new Date(new Date().getTime() + (60000 * 5));

    try {
      this.event.at = moment.utc(this.event.at).seconds(0).milliseconds(0).zone(this.timezoneOffset).format();
      this.eventAt = moment.utc(this.event.at).seconds(0).milliseconds(0).zone(this.timezoneOffset).format();
    } catch (error) {
      console.log(error);
    }

    this.dayOfTheWeek = new Date(this.event.at).getDay();
  }

  dayOfTheWeekChanged(dayOfTheWeek) {
    const at: Date = new Date(this.event.at);
    const currentDay = at.getDay();
    console.log(currentDay, at);
    const distance = dayOfTheWeek - currentDay;

    // if (distance < 0) {
    //   distance += 7;
    // }

    at.setDate(at.getDate() + distance);

    this.event.at = new Date(at).toISOString();
  }

  async adicionar() {
    this.modalCtrl.dismiss({
      action: 'create',
      event: this.event
    });
  }

  hoursChanged() {

    // const eventAt = moment(this.eventAt, 'HH:mm');
    // const eventAt = moment(this.eventAt).format('HH:mm:ss');

    const hour = moment(this.eventAt).format('HH');
    const minutes = moment(this.eventAt).format('mm');

    // console.log(eventAt, hour, minutes);

    // console.log([
    //   moment(eventAt, 'HH:mm').format('HH'),
    //   moment(eventAt, 'HH:mm').format('mm'),
    // ]);

    this.event.at = moment(this.event.at)
      .hours(+hour)
      .minutes(+minutes)
      .zone(this.timezoneOffset).format();
  }

  sair() {
    this.modalCtrl.dismiss({
      action: 'dismiss',
      event: this.event
    });
  }

}
