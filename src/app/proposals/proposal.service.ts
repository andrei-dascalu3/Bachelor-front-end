import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Proposal } from './proposal.model';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  proposalsChanged = new Subject<Proposal[]>();

  private proposals: Proposal[] = [
    new Proposal(
      'Minesweeper in Python',
      'Implement a Minesweeper game in Python. It can be a multiplayer version.',
      ['link1', 'link2'],
      true
    ),
    new Proposal(
      'Image recognition',
      'Propose an image recognition application using ML algorithm.',
      ['link3', 'link4'],
      false,
      2
    ),
  ];

  constructor() {}

  setProposals(proposals: Proposal[]) {
    this.proposals = proposals;
    this.proposalsChanged.next(this.proposals.slice());
  }

  getProposals() {
    return this.proposals.slice();
  }

  getProposal(index: number) {
    return this.proposals[index];
  }

  addProposal(proposal: Proposal) {
    this.proposals.push(proposal);
    this.proposalsChanged.next(this.proposals.slice());
  }

  updateProposal(index: number, newProposal: Proposal) {
    this.proposals[index] = newProposal;
    this.proposalsChanged.next(this.proposals.slice());
  }

  deleteProposal(index: number) {
    this.proposals.splice(index, 1);
    this.proposalsChanged.next(this.proposals.slice());
  }
}
