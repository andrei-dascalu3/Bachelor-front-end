import { Component, Input, OnInit } from '@angular/core';
import { Accord } from '../../models/accord.model';

@Component({
  selector: 'app-accord-item',
  templateUrl: './accord-item.component.html',
  styleUrls: ['./accord-item.component.css']
})
export class AccordItemComponent implements OnInit {

  @Input() accord: Accord;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
