export interface SearchCategory {
    _id: string;
    category_name: string;
    catagory_image: string;
    click: number;
    itemsCount: number;
  }
  
  export interface CategoriesResponse {
    searchCategory: SearchCategory[];
  }