import { Component, OnInit } from '@angular/core';
import { SppinerService } from '../sppiner.service';
import { ModalController } from '@ionic/angular';
import { Compromisso } from '../model/compromisso.model';
import { CrudEventPage } from '../crud-event/crud-event.page';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  events: Compromisso[] =  [];
  path = 'agenda-events';

  constructor(
    private sppinerService: SppinerService,
    private modalCtrl: ModalController) { }

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
        event: new Compromisso('Prova', null, null, null, null, true),
      }
    });

    await modal.present();

    const cb: any = await modal.onDidDismiss();

    if (cb.data.action === 'create') {
      this.events.push(cb.data.event);
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

    localStorage.setItem(this.path, JSON.stringify(this.events));

  }

  deleteEvent(event: Compromisso) {
    this.events.splice(this.events.indexOf(event), 1);
    localStorage.setItem(this.path, JSON.stringify(this.events));
  }

}
