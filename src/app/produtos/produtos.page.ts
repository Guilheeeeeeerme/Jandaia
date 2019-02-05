import { Component, OnInit } from '@angular/core';
import { JandaiaAPIService } from '../jandaia-api.service';
import { SppinerService } from '../sppiner.service';
import { ModalController } from '@ionic/angular';
import { ProductDetailsPage } from '../product-details/product-details.page';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  products: any = [];
  s_categoria_produtos = ['26'];
  page: number;
  hasNext: boolean;
  hasBack: boolean;

  constructor(
    private jandaiaApiService: JandaiaAPIService, 
    private sppinerService: SppinerService, 
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.page = 1;
    this.getProducts(this.page);
  }

  getProducts (page: number) {

    this. hasBack = page > 1;

    this.sppinerService.show();
    this.jandaiaApiService.getProducts(page, this.s_categoria_produtos).subscribe((products: any[]) => {
      this.products = products;
      this.hasNext = products.length === 10;
      this.sppinerService.hide();
    });
  }

  async openProduct(produto){
    const modal = await this.modalCtrl.create({
      component: ProductDetailsPage,
      componentProps: {
        produto: produto
      }
    });

    await modal.present();

  }

}
