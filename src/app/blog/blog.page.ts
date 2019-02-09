import { Component, OnInit } from '@angular/core';
import { JandaiaAPIService } from '../jandaia-api.service';
import { SppinerService } from '../sppiner.service';
import { ModalController } from '@ionic/angular';
import { BlogPostPage } from '../blog-post/blog-post.page';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {

  posts: any = [];
  page: number;
  hasNext: boolean;
  hasBack: boolean;

  constructor(
    private modalCtrl: ModalController,
    private jandaiaApiService: JandaiaAPIService,
    private sppinerService: SppinerService) { }

  ngOnInit() {
    this.page = 1;
    this.getBlogPosts(this.page);
  }

  getBlogPosts (page: number) {

    this.sppinerService.show();

    this.hasNext = false;
    this.hasBack = false;

    this.jandaiaApiService.getBlogPosts(page).subscribe((posts: any[]) => {
      this.posts = posts;
      this.sppinerService.hide();
    }, () => {
      this.posts = [];
      this.sppinerService.hide();
    });

    this.jandaiaApiService.getBlogPosts(page + 1).subscribe(
      () => {
        this.hasNext = true;
      }, () => {
        this.hasNext = false;
      });

    this.jandaiaApiService.getBlogPosts(page - 1).subscribe(
      () => {
        this.hasBack = true;
      }, () => {
        this.hasBack = false;
      });

  }

  async showPostDetails(post) {
    const modal = await this.modalCtrl.create({
      component: BlogPostPage,
      componentProps: {
        post: post
      },
    });

    modal.present();
  }

}
