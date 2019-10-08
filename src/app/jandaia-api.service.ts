import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class JandaiaAPIService {

  private baseUrl = `${BASE_URL}/myplugin/v1/products/`;
  private detailsUrl = `${BASE_URL}/myplugin/v1/product-details/`;
  private blogUrl = `${BASE_URL}/wp/v2/posts`;

  constructor(private _http: HttpClient) { }

  getProducts(page: number, s_categoria_produtos: any[]) {

    let s_categoria_produtos_p = null;

    s_categoria_produtos.map(a => {
      if (s_categoria_produtos_p) {
        s_categoria_produtos_p += '&s_categoria_produtos[]=' + a;
      } else {
        s_categoria_produtos_p = 's_categoria_produtos[]=' + a;
      }
      return a;
    });

    return this._http.get(this.baseUrl +  page + '?' + s_categoria_produtos_p);
  }

  getBlogPosts(page: number) {
    const per_page = 10;
    return this._http.get(this.blogUrl + '?per_page=' + per_page + '&page=' + page + '&_embed');
  }

  getProductDetails(id: any): any {
    return this._http.get(this.detailsUrl +  id);
  }

}
