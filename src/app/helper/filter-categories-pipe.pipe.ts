import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategoriesPipe',
  standalone: true
})
export class FilterCategoriesPipe implements PipeTransform {

  transform(categories: any[], searchText: string): any[] {
    if (!categories || !searchText) {
      return categories;
    }
    return categories.filter(category =>
      category.category_name.toLowerCase().includes(searchText.toLowerCase())
    );

};

}
