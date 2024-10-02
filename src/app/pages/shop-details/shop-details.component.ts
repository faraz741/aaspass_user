import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent {
  shopData: any;
  shopImages: any[] = []
  constructor(private router: Router, private _apiService: ApiService, private route: Router) { }

  ngOnInit(): void {
    const storedShopData = this._apiService.getShop()
    if (storedShopData) {
      try {
        this.shopData = storedShopData;
        this.shopImages = storedShopData.shopImages;
        console.log(this.shopData);
      } catch (e) {
        console.error('Error parsing shop data', e);
      }
    }
  }
}
