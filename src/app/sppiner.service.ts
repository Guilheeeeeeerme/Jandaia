import { Injectable } from '@angular/core';
import { shallowEqual } from '@angular/router/src/utils/collection';
import { HighlightDelayBarrier } from 'blocking-proxy/built/lib/highlight_delay_barrier';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class SppinerService {

  constructor() { }

  show() {
    $('.page-loader').css('opacity', '1');
    $('.page-loader').css('display', 'block');
  }

  hide() {
    $('.page-loader').animate({
      opacity: 0,
    }, 1000, () => {
      $('.page-loader').css('display', 'none');
    });
  }

}
