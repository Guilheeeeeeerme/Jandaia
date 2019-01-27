import { Component, OnInit } from '@angular/core';
import { JandaiaAPIService } from '../jandaia-api.service';
import { SppinerService } from '../sppiner.service';

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

  constructor(private jandaiaApiService: JandaiaAPIService, private sppinerService: SppinerService) { }

  ngOnInit() {
    this.page = 1;
    this.getBlogPosts(this.page);
  }

  getBlogPosts (page: number) {

    this. hasBack = page > 1;

    this.sppinerService.show();
    this.jandaiaApiService.getBlogPosts(page).subscribe((posts: any[]) => {
      this.posts = posts;
      this.hasNext = posts.length === 10;
      this.sppinerService.hide();
    });
  }

}
