import { Component, OnInit } from '@angular/core';
import { SppinerService } from '../sppiner.service';
import { WpLoginService } from '../wp-login.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {

  constructor(private sppinerService: SppinerService, private wpLoginService: WpLoginService) { }

  ngOnInit() {
    this.sppinerService.hide();
  }

}
