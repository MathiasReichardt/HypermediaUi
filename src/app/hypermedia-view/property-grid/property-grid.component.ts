import { Component, OnInit, Input } from '@angular/core';
import { PropertyInfo, PropertyTypes } from '../siren-parser/property-info';

@Component({
  selector: 'app-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.scss']
})
export class PropertyGridComponent implements OnInit {
  @Input() propertyContainer: PropertyInfo[];

  public propertyTypes = PropertyTypes;

  constructor() { }

  ngOnInit() {
  }
}
