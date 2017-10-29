import { ErrorDialogPresenter } from './error-dialog-presenter.service';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorDialog: ErrorDialogPresenter) {}

  handleError(error: any) {
    console.error(error);

    // Replace 'if instanceof ...' stuff with a mapping when we decided how to render and translate errors.

    const message = 'An error occurred.';

    this.errorDialog.open('Uuups!', message, 'warn');
  }
}
