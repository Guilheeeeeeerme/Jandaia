import { Component, OnInit } from '@angular/core';
import { SppinerService } from '../sppiner.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  constructor(private sppinerService: SppinerService) { }

  ngOnInit() {
    this.sppinerService.hide();
  }

}