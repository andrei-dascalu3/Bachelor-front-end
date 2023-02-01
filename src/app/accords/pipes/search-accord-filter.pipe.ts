import { Pipe, PipeTransform } from '@angular/core';
import { Accord } from '../models/accord.model';

@Pipe({
  name: 'searchAccordFilter'
})
export class SearchAccordFilterPipe implements PipeTransform {

  transform(users: Accord[], search: string): any {
    search = search.toLowerCase();
    const result = users.reduce(
      (acc, value, index) =>
        this.condition(value, search)
          ? [...acc, { index, value }]
          : acc,
      []
    );
    return result;
  }

  private condition(value: Accord, search: string): boolean {
    return (
      value.studUsername.toLowerCase().includes(search) ||
      value.profUsername.toLowerCase().includes(search) ||
      value.propTitle.toLowerCase().includes(search)
    );
  }

}
