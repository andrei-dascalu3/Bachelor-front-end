import { Component, Input, OnInit } from '@angular/core';
import { Preference } from '../../models/preference.model';

@Component({
  selector: 'app-preference-item',
  templateUrl: './preference-item.component.html',
  styleUrls: ['./preference-item.component.css']
})
export class PreferenceItemComponent implements OnInit {

  @Input() preference: Preference;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
