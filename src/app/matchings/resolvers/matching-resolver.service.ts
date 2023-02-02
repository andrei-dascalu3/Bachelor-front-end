import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Matching } from '../models/matching.model';
import { MatchingService } from '../services/matching.service';

@Injectable({
  providedIn: 'root'
})
export class MatchingResolverService implements Resolve<Matching[]> {
  constructor(private matchingService: MatchingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Matching[] | Observable<Matching[]> | Promise<Matching[]> {
    return this.matchingService.fetchMatchings();
  }
}
