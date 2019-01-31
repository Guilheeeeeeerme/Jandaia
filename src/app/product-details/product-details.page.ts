import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JandaiaAPIService } from '../jandaia-api.service';
import { SppinerService } from '../sppiner.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  produto;
  productDetails: any;

  slideOpts = {
    effect: 'flip'
  };

  constructor(
    private modalCtrl: ModalController,
    private jandaiaAPIService: JandaiaAPIService,
    private sppinerService: SppinerService) { }

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails() {
    this.sppinerService.show();
    this.jandaiaAPIService.getProductDetails(this.produto.id).subscribe((productDetails: any) => {
      this.productDetails = productDetails[0];
      this.sppinerService.hide();
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
