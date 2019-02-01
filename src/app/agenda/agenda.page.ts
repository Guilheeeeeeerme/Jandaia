import { Component, OnInit } from '@angular/core';
import { SppinerService } from '../sppiner.service';
import { ModalController, Events } from '@ionic/angular';
import { Compromisso } from '../model/compromisso.model';
import { CrudEventPage } from '../crud-event/crud-event.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  events: Compromisso[] = [];
  path = 'agenda-events';

  constructor(
    private sppinerService: SppinerService,
    private modalCtrl: ModalController,
    private localNotifications: LocalNotifications) { }

  ngOnInit() {
    try {
      const a = JSON.parse(localStorage.getItem(this.path));
      this.events = a || [];
    } catch (error) {
      console.log(error);
    }

    this.sppinerService.hide();
  }

  async addEvent() {
    const modal = await this.modalCtrl.create({
      component: CrudEventPage,
      componentProps: {
        action: 'create',
        event: new Compromisso('Prova', new Date().toISOString(), null, null, true),
      }
    });

    await modal.present();

    const cb: any = await modal.onDidDismiss();

    if (cb.data.action === 'create') {
      this.events.push(cb.data.event);

      const compromisso: Compromisso = (cb.data.event as Compromisso);
      Compromisso.schedule(compromisso, this.localNotifications);
    }

    localStorage.setItem(this.path, JSON.stringify(this.events));

  }

  async updateEvent(event: Compromisso) {
    const modal = await this.modalCtrl.create({
      component: CrudEventPage,
      componentProps: {
        action: 'update',
        event: event
      }
    });

    await modal.present();
    const cb: any = await modal.onDidDismiss();

    const compromisso: Compromisso = (cb.data.event as Compromisso);
    Compromisso.schedule(compromisso, this.localNotifications);

    localStorage.setItem(this.path, JSON.stringify(this.events));

  }

  deleteEvent(compromisso: Compromisso) {
    this.localNotifications.cancel(compromisso.id).finally(() => {
      this.events.splice(this.events.indexOf(compromisso), 1);
      localStorage.setItem(this.path, JSON.stringify(this.events));
    });
  }

  getDayOfWeek(dayOfWeek) {
    return [
      'Domingo',
      'Segunda Feira',
      'Terça Feira',
      'Quarta Feira',
      'Quinta Feira',
      'Sexta Feira',
      'Sábado'
    ][dayOfWeek];
  }

  organize(events, dayOfWeek) {
    return events.filter((event) => {
      return new Date(event).getDay() === dayOfWeek;
    });
  }

}
