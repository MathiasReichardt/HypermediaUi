import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-modal-dialog.component.html',
  styleUrls: ['./error-modal-dialog.component.scss']
})
export class ErrorModalDialogComponent {
  @Input() title = 'Error';
  @Input() message = 'Critical Error raiseed';
  @Input() color = 'basic';

  @Output() close = new EventEmitter();

  constructor() {
    this.close.subscribe(() => location.reload());
  }
}
