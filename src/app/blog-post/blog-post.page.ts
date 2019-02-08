import { Component, OnInit, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.page.html',
  styleUrls: ['./blog-post.page.scss'],
})
export class BlogPostPage implements OnInit {

  post;

  constructor(
    private sanitizer: DomSanitizer,
    private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  onClick(event) {
    console.log(event);
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

  openLink ($event) {
    console.log($event);
  }

}
