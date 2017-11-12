import { Component, OnInit, Input } from '@angular/core';
import { HypermediaAction } from '../../hypermedia-client.service';

@Component({
  selector: 'app-parameter-action',
  templateUrl: './parameter-action.component.html',
  styleUrls: ['./parameter-action.component.scss']
})
export class ParameterActionComponent implements OnInit {
  @Input() action: HypermediaAction;

  constructor() { }

  ngOnInit() {
  }

}
