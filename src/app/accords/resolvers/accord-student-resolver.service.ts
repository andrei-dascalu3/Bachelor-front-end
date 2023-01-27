import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Accord } from '../models/accord.model';
import { AccordService } from '../services/accord.service';

@Injectable({
  providedIn: 'root',
})
export class AccordStudentResolverService implements Resolve<Accord[]> {
  constructor(private accordService: AccordService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Accord[] | Observable<Accord[]> | Promise<Accord[]> {
    return this.accordService.fetchStudentAccords();
  }
}
