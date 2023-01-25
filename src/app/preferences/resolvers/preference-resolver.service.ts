import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Preference } from '../models/preference.model';
import { PreferenceService } from '../services/preference.service';

@Injectable({
  providedIn: 'root',
})
export class PreferenceResolverService implements Resolve<Preference[]> {
  constructor(private preferenceService: PreferenceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Preference[] | Observable<Preference[]> | Promise<Preference[]> {
    return this.preferenceService.fetchUserPreferences();
  }
}
