import { MatchedProposal } from "./matched-proposal.model";
import { MatchedStudent } from "./matched-student.model";

export class Matching {
  constructor(
    public student: MatchedStudent,
    public proposal: MatchedProposal,
    public cost: number
  ) {}
}
