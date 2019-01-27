import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JandaiaAPIService {

  private baseUrl = 'http://jandaia.com/wp-json/myplugin/v1/products/';
  private blogUrl = 'http://jandaia.com/wp-json/wp/v2/posts';

  constructor(private _http: HttpClient) { }

  getProducts(page: number) {
    return this._http.get(this.baseUrl + page);
  }

  getBlogPosts(page: number) {
    const per_page = 10;
    return this._http.get(this.blogUrl + '?per_page=' + per_page + '&page=' + page);
  }

}
