import { Pipe, PipeTransform } from '@angular/core';
import { Preference } from '../models/preference.model';

@Pipe({
  name: 'searchPreferenceFilter'
})
export class SearchPreferenceFilterPipe implements PipeTransform {

  transform(users: Preference[], search: string): any {
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

  private condition(value: Preference, search: string): boolean {
    return (
      value.title.toLowerCase().includes(search) ||
      value.profUsername.toLowerCase().includes(search)
    );
  }

}
