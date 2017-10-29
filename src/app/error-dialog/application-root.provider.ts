import { Injectable, ViewContainerRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ErrorDialogContainerProvider {
  private appRoot = new ReplaySubject<ViewContainerRef>();

  container(): Observable<ViewContainerRef> {
    return this.appRoot.asObservable();
  }

  pushContainer(ref: ViewContainerRef) {
    this.appRoot.next(ref);
  }
}
