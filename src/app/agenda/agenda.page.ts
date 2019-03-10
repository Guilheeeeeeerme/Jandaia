import { Component, OnInit } from '@angular/core';
import { SppinerService } from '../sppiner.service';
import { ModalController, Events } from '@ionic/angular';
import { Compromisso } from '../model/compromisso.model';
import { CrudEventPage } from '../crud-event/crud-event.page';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { JandaiaLocalNotifications } from '../model/JandaiaLocalNotifications';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit, JandaiaLocalNotifications {

  events: Compromisso[] = [];
  path = 'agenda-events';
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
      if(!hasPermission) {
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
        event: new Compromisso('Prova', new Date().toISOString(), null, null, true),
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
        event: event
      }
    });

    await modal.present();
    const cb: any = await modal.onDidDismiss();

    Compromisso.scheduleAll(this.events, this);
    localStorage.setItem(this.path, JSON.stringify(this.events));

  }

  deleteEvent(compromisso: Compromisso) {
    Compromisso.cancelPrematureNotifications(compromisso, this);
    this.localNotifications.cancel(compromisso.id).finally(() => {
      this.events.splice(this.events.indexOf(compromisso), 1);
      localStorage.setItem(this.path, JSON.stringify(this.events));
    });
  }

  organize(events) {
    // return events.filter((event) => {
    //   return new Date(event.at).getTime() > new Date().getTime();
    // }).sort((eventA, eventB) => {
    //   return new Date(eventA.at).getTime() - new Date(eventB.at).getTime();
    // });
    return events.sort((eventA, eventB) => {
      return new Date(eventA.at).getTime() - new Date(eventB.at).getTime();
    });
  }

  schedule(schedule: ILocalNotification): void {
    this.localNotifications.schedule(schedule);
  }

  cancel(id: number): Promise<any> {
    return this.localNotifications.cancel(id);
  }

}
