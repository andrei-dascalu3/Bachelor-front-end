import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'searchUserFilter',
})
export class SearchUserFilterPipe implements PipeTransform {
  transform(users: User[], search: string): any {
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

  private condition(value: User, search: string): boolean {
    return (
      value.username.toLowerCase().includes(search) ||
      value.firstName.toLowerCase().includes(search) ||
      value.lastName.toLowerCase().includes(search)
    );
  }
}
