import { Component, OnInit } from '@angular/core';
import { JandaiaAPIService } from '../jandaia-api.service';
import { SppinerService } from '../sppiner.service';
// import { JandaiaApiService } from '../jandaia-api.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  products: any = [];
  page: number;
  hasNext: boolean;
  hasBack: boolean;

  constructor(private jandaiaApiService: JandaiaAPIService, private sppinerService: SppinerService) { }

  ngOnInit() {
    this.page = 1;
    this.getProducts(this.page);
  }

  getProducts (page: number) {

    this. hasBack = page > 1;

    this.sppinerService.show();
    this.jandaiaApiService.getProducts(page).subscribe((products: any[]) => {

      products = products.map((produto) => {
        produto.title = produto.title.replace(/&#8211;/g, '-');
        return produto;
      });

      this.products = products;
      this.hasNext = products.length === 10;
      this.sppinerService.hide();
    });
  }

}
