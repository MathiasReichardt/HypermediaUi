import { HypermediaAction } from './../hypermedia-client.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-actions-view',
  templateUrl: './actions-view.component.html',
  styleUrls: ['./actions-view.component.scss']
})
export class ActionsViewComponent implements OnInit {
  @Input() actions: HypermediaAction[];

  constructor() { }

  ngOnInit() {
  }
}
