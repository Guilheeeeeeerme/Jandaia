import { Component, OnInit } from '@angular/core';
import { SppinerService } from '../sppiner.service';
import { ModalController, Events } from '@ionic/angular';
import { Compromisso } from '../model/compromisso.model';
import { CrudEventPage } from '../crud-event/crud-event.page';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  events: Compromisso[] = [];
  path = 'agenda-events';
  allScheduled: any;
  jandaia_bind_path = 'jandaia_bind';
  prematureEvents: any;

  constructor(
    private sppinerService: SppinerService,
    private modalCtrl: ModalController,
    private localNotifications: LocalNotifications) { }

  ngOnInit() {
    try {
      const events = JSON.parse(localStorage.getItem(this.path));
      this.events = events || [];
      // localStorage.setItem(this.jandaia_bind_path, JSON.stringify({}));
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
        event: new Compromisso('Prova', new Date().toISOString(), null, null, true),
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
        const schedules: ILocalNotification[] = this.schedulePrematureNotifications(compromisso);
        schedules.map((s) => {
          this.localNotifications.schedule(s);
        });
      }

    }

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

    Promise.all([
      this.cancelPrematureNotifications(event.id),
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
        const schedules: ILocalNotification[] = this.schedulePrematureNotifications(compromisso);
        schedules.map((s) => {
          this.localNotifications.schedule(s);
        });
      }

    });

  }

  deleteEvent(event: Compromisso) {
    this.cancelPrematureNotifications(event.id);

    Promise.all([
      this.localNotifications.cancel(event.id),
      this.localNotifications.clear(event.id),
      this.cancelPrematureNotifications(event.id),
    ]).finally(() => {

      this.events = this.events.filter((compromisso) => {
        return +compromisso.id !== +event.id;
      });
      localStorage.setItem(this.path, JSON.stringify(this.events));

    });
  }

  organize(events) {
    return events.sort((eventA, eventB) => {
      return new Date(eventA.at).getTime() - new Date(eventB.at).getTime();
    });
  }

  private cancelPrematureNotifications(compromissoId: number): Promise<any> {

    this.prematureEvents = JSON.parse(localStorage.getItem(this.jandaia_bind_path));

    if (!this.prematureEvents) {
      this.prematureEvents = {};
    }

    if (!this.prematureEvents[compromissoId]) {
      this.prematureEvents[compromissoId] = [];
    }

    const schedulesPromise: Promise<any>[] = [];
    const schedules: ILocalNotification[] = this.prematureEvents[compromissoId];

    schedules.map((schedule: ILocalNotification) => {
      schedulesPromise.push(this.localNotifications.cancel(schedule.id));
      schedulesPromise.push(this.localNotifications.clear(schedule.id));
    });

    return Promise.all(schedulesPromise);
  }

  private schedulePrematureNotifications(compromisso: Compromisso): ILocalNotification[] {
    this.prematureEvents = JSON.parse(localStorage.getItem(this.jandaia_bind_path));
    const newHash: ILocalNotification[] = [];

    if (!this.prematureEvents) {
      this.prematureEvents = {};
    }

    if (!this.prematureEvents[compromisso.id]) {
      this.prematureEvents[compromisso.id] = [];
    }

    [
      (24 * 10),
      (24 * 7),
      (24 * 5),
      (24 * 2),
      (24 * 1)
    ].map((earlier, index) => {
      earlier = (earlier * 60 * 60 * 1000);

      let id: number;

      if (this.prematureEvents[compromisso.id] &&
        this.prematureEvents[compromisso.id][index] &&
        this.prematureEvents[compromisso.id][index].id) {
        id = this.prematureEvents[compromisso.id][index].id;
      } else {
        id = Compromisso.getId();
      }

      let at: Date = new Date(compromisso.at);

      at = new Date(at.getTime() - earlier);

      const schedule: ILocalNotification = {
        id: id,
        title: this.getSentence()[index],
        text: compromisso.tipo + ' de ' + compromisso.materia,
        vibrate: true
      };

      const newAt: Date = new Date(at);

      const year = newAt.getFullYear();
      const month = newAt.getMonth();
      const day = newAt.getDate();
      const hours = newAt.getHours();
      const minutes = newAt.getMinutes();

      schedule.trigger = {
        // every: { year: year, month: month, day: day, hour: hours, minute: minutes },
        at: new Date(year, month, day, hours, minutes, 0, 0),
        // every: {
        //   minute: minutes,
        //   hour: hours,
        //   day: day,
        //   month: month,
        //   year: year
        // }
      };

      newHash.push(schedule);

    });

    this.prematureEvents[compromisso.id] = newHash;
    localStorage.setItem(this.jandaia_bind_path, JSON.stringify(this.prematureEvents));

    return newHash;

  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  private getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  private getSentence() {

    const sentences = [
      '10 dias - Já começou a estudar?',
      '1 semana - Boas notas combinam com preparação!',
      '5 dias - Já se preparou?',
      '2 dias´- Hora da revisão!',
      '1 dia - Você estudou e vai se sair bem!',
    ];
    return sentences;
    // return sentences[Math.floor(this.getRandomArbitrary(0, sentences.length))];
  }

}
