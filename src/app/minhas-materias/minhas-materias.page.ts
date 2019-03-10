import { Component, OnInit } from '@angular/core';
import { SppinerService } from '../sppiner.service';
import { Compromisso } from '../model/compromisso.model';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { ModalController } from '@ionic/angular';
import { CrudEventPage } from '../crud-event/crud-event.page';
import { JandaiaLocalNotifications } from '../model/JandaiaLocalNotifications';

@Component({
  selector: 'app-minhas-materias',
  templateUrl: './minhas-materias.page.html',
  styleUrls: ['./minhas-materias.page.scss'],
})
export class MinhasMateriasPage implements OnInit, JandaiaLocalNotifications {
  events: Compromisso[] = [];
  path = 'materias-events';
  allScheduled: any;

  constructor(
    private sppinerService: SppinerService,
    private modalCtrl: ModalController,
    private localNotifications: LocalNotifications) { }

  ngOnInit() {
    try {
      const a = JSON.parse(localStorage.getItem(this.path));
      this.events = a || [];
      Compromisso.scheduleAll(this.events, this);
      localStorage.setItem(this.path, JSON.stringify(this.events));
    } catch (error) {
      console.log(error);
    }

    this.localNotifications.hasPermission().then((hasPermission) => {
      console.log('hasPermission', hasPermission);
      if (!hasPermission) {
        this.localNotifications.requestPermission();
      }
    });

    // setInterval(() => {

    //   this.localNotifications.getAll()
    //     .then((allScheduled) => {
    //       this.allScheduled = allScheduled;
    //     }).catch((reason) => {
    //       this.allScheduled = reason;
    //     });

    // }, 1000);

    this.sppinerService.hide();
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
      this.events.push(cb.data.event);
    }

    Compromisso.scheduleAll(this.events, this);
    localStorage.setItem(this.path, JSON.stringify(this.events));

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

    Compromisso.scheduleAll(this.events, this);
    localStorage.setItem(this.path, JSON.stringify(this.events));

  }

  deleteEvent(compromisso: Compromisso) {
    this.events.splice(this.events.indexOf(compromisso), 1);
    localStorage.setItem(this.path, JSON.stringify(this.events));

    Compromisso.cancelPrematureNotifications(compromisso, this);
    this.localNotifications.cancel(compromisso.id);
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
      // console.log(new Date(event.at).getDay(), dayOfWeek)
      return new Date(event.at).getDay() === dayOfWeek;
    });
  }

  schedule(schedule: ILocalNotification): void {
    this.localNotifications.schedule(schedule);
  }

  cancel(id: number): Promise<any> {
    return this.localNotifications.cancel(id);
  }


}
