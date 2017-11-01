import { HypermediaAction, HypermediaClientService, ActionResults } from './../../hypermedia-client.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-parameterless-action-view',
  templateUrl: './parameterless-action-view.component.html',
  styleUrls: ['./parameterless-action-view.component.scss']
})
export class ParameterlessActionViewComponent implements OnInit {
  @Input() action: HypermediaAction;

  actionResult: ActionResults;
  actionMessage: string;

  constructor(private hypermediaClientService: HypermediaClientService) { }

  ngOnInit() {
  }

  public executeAction() {
    this.hypermediaClientService.executeParameterlessAction(this.action, (result: ActionResults, message?: string) => {
      this.actionResult = result;

      if (message) {
        this.actionMessage = message;
      } else {
        this.actionMessage = '';
      }
    });
  }

}
