import { Component, OnInit, OnDestroy } from '@angular/core';
import { SppinerService } from '../sppiner.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.page.html',
  styleUrls: ['./jogo.page.scss'],
})
export class JogoPage implements OnInit, OnDestroy {

  url_do_jogo = 'http://felipegamedev.com/games/jandaia/';
  url_do_apk = 'https://jandaia.com/novosite/wp-content/uploads/2019/02/Jandaia_jogo.apk';

  constructor(
    private screenOrientation: ScreenOrientation,
    private sppinerService: SppinerService) { }

  ngOnInit() {
    // window.open(this.url_do_apk, '_blank');
    // screen.orientation.lock('landscape');
    // set to landscape
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.sppinerService.hide();
  }

  ngOnDestroy(): void {
    // this.screenOrientation.unlock();
  }

}
