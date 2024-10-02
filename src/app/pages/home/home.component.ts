import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from 'src/app/services/location.service';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { CategoriesResponse } from 'src/app/Models/category';
// Import your library
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FilterCategoriesPipe } from 'src/app/helper/filter-categories-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { SearchShop, SearchShopsResponse } from 'src/app/Models/shops';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, SlickCarouselModule, FilterCategoriesPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchText: string = '';
  location!: any;
  data: any[] = [];
  categories$!: Observable<CategoriesResponse>;
  shops$!: Observable<SearchShopsResponse>;

  slideConfig = {
    slidesToShow: 3, // Number of slides to show per view
    slidesToScroll: 3, // Number of slides to scroll at a time
    infinite: true, // Enable infinite scrolling
    dots: false, // Show navigation dots
    arrows: false, // Show navigation arrows
    autoplay: false, // Enable autoplay
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 300
      }
    ] // Set autoplay speed (in milliseconds)
  };
  constructor(private locationService: LocationService, private _apiService: ApiService, private route: Router) {
    this.locationService.getCurrentLocation().then(
      (location) => {
        this.location = location;
        this.getShopsData()
        console.log('Location obtained: ', location);
      },
      (error) => {
        console.error('Error obtaining location: ', error);
      }
    );
  };
  slickInit(e: any) {
    console.log('slick initialized');
  };
  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }
  ngOnInit(): void {
    this.getData();
  };

  getData() {
    this.categories$ = this._apiService.getApi('getAllCategories');
    console.log(this.location)

    // console.log(formData)
    // this.shops$ =  this._apiService.postAPI('getAllUserShops', formData)
  };


  getShopsData() {
    const formData = {

      location: this.location
    };
    this._apiService.postAPI('getAllUserShops', formData).subscribe({
      next: (resp: any) => {
        this.data = resp.searchShops;

      },
      error: error => {
        console.log(error.message)
      }
    });


  };


  redirectToMap(coordinates: [number, number]): void {
    const [longitude, latitude] = coordinates;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  shopClick(shop:any){
    this._apiService.setShop(shop)
  
    this.route.navigate(['/details']);
  }






}
