import { Component, OnInit } from '@angular/core';
import { SppinerService } from '../sppiner.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private sppinerService: SppinerService) { }

  ngOnInit() {
    this.sppinerService.hide();
  }

}
