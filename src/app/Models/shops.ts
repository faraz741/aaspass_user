export interface ShopImage {
    fileName: string;
    downloadUrl: string;
  }
  
  export interface Location {
    type: string;
    coordinates: number[];
  }
  
  export interface SearchShop {
    _id: string;
    shopName: string;
    address: string;
    area: string;
    location: Location;
    ownerName: string;
    phoneNo: number;
    categoryId: string[];
    workingDays: string[];
    openTime: string;
    closeTime: string;
    shopImages: ShopImage[];
    distance: number;
    distanceKm: number;
  }
  
  export interface SearchShopsResponse {
    searchShops: SearchShop[];
  }
  