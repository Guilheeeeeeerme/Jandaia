import { Component, OnInit } from '@angular/core';
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
    private sanitizer:DomSanitizer, 
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
    // return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }

}
