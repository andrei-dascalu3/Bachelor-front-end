import { Pipe, PipeTransform } from '@angular/core';
import { Proposal } from '../models/proposal.model';

@Pipe({
  name: 'searchProposalFilter'
})
export class SearchProposalFilterPipe implements PipeTransform {

  transform(users: Proposal[], search: string): any {
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

  private condition(value: Proposal, search: string): boolean {
    return (
      value.title.toLowerCase().includes(search) ||
      value.description.toLowerCase().includes(search)
    );
  }

}
