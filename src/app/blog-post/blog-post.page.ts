import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { SppinerService } from '../sppiner.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.page.html',
  styleUrls: ['./blog-post.page.scss'],
})
export class BlogPostPage implements OnInit {

  post;
  postHtml: any;

  constructor(
    private sanitizer: DomSanitizer,
    private sppinerService: SppinerService,
    private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.sppinerService.show();

    this.postHtml = this.transform(this.post.content.rendered);

    setTimeout(() => {

      $('#blog-post img').css('height', 'auto');

      $('#blog-post a').click(function (event) {
        // Don't follow the link
        // event.preventDefault();
        // Log the clicked element in the console
        // window.open(this.href, '_system');

        window.open($(this).attr('href'), '_system');
        // $(this).attr('href', $(this).attr('href') + seed);


      });

      // [].forEach.call(  $('#blog-post a') , function(yourImg) {
      //   // [].forEach.call(  document.getElementsByTagName('img')  , function(yourImg) {
      //   yourImg.style.height = 'auto';
      //   // yourImg.style.width = '200px';
      // });

      // [].forEach.call(  $('#blog-post a') , function(yourImg) {
      // // [].forEach.call(  document.getElementsByTagName('a')  , function(yourLink) {

      //   yourLink.addEventListener('click', function (event) {
      //     // Don't follow the link
      //     event.preventDefault();
      //     // Log the clicked element in the console
      //     window.open(this.href, '_system');
      //   }, false);

      // });

      this.sppinerService.hide();

    }, 2000);

  }

  onClick(event) {
    // console.log(event);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  transform(style) {

    // style = style.replace(
    //   /(href)=(".*")/g,
    //   '$1="#" onclick="window.open($2, \"_system\", \"location=yes\"); return false;"'
    // );

    // href="#" onclick="window.open('http://www.starwars.com/', '_system', 'location=yes'); return false;


    // console.log(style);
    return this.sanitizer.bypassSecurityTrustHtml(style);
    // return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs



  }

  openLink($event) {
    // console.log($event);
  }

}
