import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  location!: any;
  @ViewChild('searchInput') searchInput!: ElementRef;
  itemsData:any[]=[];
  categoryData:any[]=[];
  shopsData:any[]=[];
  searchSubject: Subject<string> = new Subject();
  constructor(private router: Router , private cdr: ChangeDetectorRef, private _apiService:ApiService,private locationService: LocationService) {
    this.locationService.getCurrentLocation().then(
      (location) => {
        this.location = location
        console.log('Location obtained: ', location);
      },
      (error) => {
        console.error('Error obtaining location: ', error);
      }
    );
  };

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(400), // Wait 1 second after the last event
      distinctUntilChanged() // Only emit when the current value is different than the last
    ).subscribe(searchTerm => {
  
      this.fetchItemsSuggestions(searchTerm);
    });
   
    this.router.events.subscribe((event: any) => {
    
      if (this.searchInput && this.searchInput.nativeElement) {
        this.searchInput.nativeElement.focus();
        this.searchInput.nativeElement.click();
    
        setTimeout(() => {
          if (this.searchInput.nativeElement) {
         
          }
        },300);
      } else {
        console.error('searchInput is undefined, element might not be rendered yet.');
      }
    });
  };



  searchItems(event: any) {
   
    const searchTerm = event.target.value;
    this.searchSubject.next(searchTerm);
  }

  fetchItemsSuggestions(searchTerm: string) {
    if (searchTerm === '') {
      // this.suggestionData = [];
      return;
    }
  
    const formData = {
      searchKeyWord: searchTerm,
      location: this.location,
    };
  
    this._apiService.postAPI(`searchShops`, formData).subscribe({
      next: (res: any) => {
      this.itemsData = res.searchItems
      this.categoryData = res.searchCategory
      this.shopsData = res.searchShops
      },
      error: err => {
        console.error(err);
      }
    });
  };

  itemsClick(item :string){
    if (item === '') {
      // this.suggestionData = [];
      return;
    }
  
    const formData = {
      itemId: item,
      location: this.location,
    };
  
    this._apiService.postAPI(`getshopsByItem`, formData).subscribe({
      next: (res: any) => {
     console.log(res)
      },
      error: err => {
        console.error(err);
      }
    });
console.log("Dfg", item)
  }
 
  
}
