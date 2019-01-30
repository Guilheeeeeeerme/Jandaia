import { Component, OnInit } from '@angular/core';
import { SppinerService } from '../sppiner.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.page.html',
  styleUrls: ['./jogo.page.scss'],
})
export class JogoPage implements OnInit {

  url_do_jogo = 'http://felipegamedev.com/games/jandaia/';

  constructor(
    private sppinerService: SppinerService) { }

  ngOnInit() {
    this.sppinerService.hide();
  }

}
