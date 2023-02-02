import { Pipe, PipeTransform } from '@angular/core';
import { Matching } from '../models/matching.model';

@Pipe({
  name: 'searchMatchingFilter'
})
export class SearchMatchingFilterPipe implements PipeTransform {

  transform(users: Matching[], search: string): any {
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

  private condition(value: Matching, search: string): boolean {
    return (
      value.studentId.toString().includes(search) ||
      value.proposalId.toString().includes(search)
    );
  }

}
