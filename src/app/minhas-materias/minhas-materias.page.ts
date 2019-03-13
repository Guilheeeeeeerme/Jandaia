import { Component, OnInit } from '@angular/core';
import { SppinerService } from '../sppiner.service';
import { Compromisso } from '../model/compromisso.model';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { ModalController } from '@ionic/angular';
import { CrudEventPage } from '../crud-event/crud-event.page';

@Component({
  selector: 'app-minhas-materias',
  templateUrl: './minhas-materias.page.html',
  styleUrls: ['./minhas-materias.page.scss'],
})
export class MinhasMateriasPage implements OnInit {
  events: Compromisso[] = [];
  path = 'materias-events';
  allScheduled: any;

  constructor(
    private sppinerService: SppinerService,
    private modalCtrl: ModalController,
    private localNotifications: LocalNotifications) { }

  ngOnInit() {

    try {
      const events = JSON.parse(localStorage.getItem(this.path));
      this.events = events || [];
    } catch (error) {
      console.log(error);
    }

    this.localNotifications.hasPermission().then((hasPermission) => {
      console.log('hasPermission', hasPermission);
      if (!hasPermission) {
        this.localNotifications.requestPermission();
      }
    });

    this.sppinerService.hide();

    // setInterval(() => {

    //   this.localNotifications.getAll()
    //     .then((allScheduled) => {
    //       this.allScheduled = allScheduled;
    //     }).catch((reason) => {
    //       this.allScheduled = reason;
    //     });

    // }, 1000);

  }

  async addEvent() {
    const modal = await this.modalCtrl.create({
      component: CrudEventPage,
      componentProps: {
        action: 'create',
        mode: 'Aula',
        event: new Compromisso('Aula', new Date().toISOString(), null, null, true),
      }
    });

    await modal.present();

    const cb: any = await modal.onDidDismiss();

    if (cb.data.action === 'create') {
      const compromisso: Compromisso = cb.data.event;
      compromisso.id = Compromisso.getId();

      this.events.push(compromisso);
      localStorage.setItem(this.path, JSON.stringify(this.events));

      if (compromisso.alerta) {
        const schedule: ILocalNotification = Compromisso.buildScheduleObject(compromisso);
        this.localNotifications.schedule(schedule);
      }

    }

  }

  async updateEvent(event: Compromisso) {

    const modal = await this.modalCtrl.create({
      component: CrudEventPage,
      componentProps: {
        action: 'update',
        mode: 'Aula',
        event: event
      }
    });

    await modal.present();
    const cb: any = await modal.onDidDismiss();

    Promise.all([
      this.localNotifications.cancel(event.id),
      this.localNotifications.clear(event.id),
    ]).finally(() => {

      const compromisso: Compromisso = cb.data.event;

      if (isNaN(compromisso.id)) {
        compromisso.id = Compromisso.getId();
      }

      this.events = this.events.map((e) => {
        if (+e.id === +compromisso.id) {
          return compromisso;
        } else {
          return e;
        }
      });

      localStorage.setItem(this.path, JSON.stringify(this.events));

      if (compromisso.alerta) {
        const schedule: ILocalNotification = Compromisso.buildScheduleObject(compromisso);
        this.localNotifications.schedule(schedule);
      }

    });

  }

  deleteEvent(event: Compromisso) {

    Promise.all([
      this.localNotifications.cancel(event.id),
      this.localNotifications.clear(event.id),
    ]).finally(() => {

      this.events = this.events.filter((compromisso) => {
        return +compromisso.id !== +event.id;
      });

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
      return new Date(event.at).getDay() === dayOfWeek;
    });
  }


}
