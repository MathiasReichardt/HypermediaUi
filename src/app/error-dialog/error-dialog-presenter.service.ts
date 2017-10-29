import { ErrorDialogContainerProvider } from './application-root.provider';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';

import { ErrorModalDialogComponent } from './error-modal-dialog/error-modal-dialog.component';

@Injectable()
export class ErrorDialogPresenter {
  _viewContainer: ViewContainerRef;

    modal: ComponentRef<ErrorModalDialogComponent>;

    set viewContainer(viewContainer: ViewContainerRef) {
      if (!viewContainer) {
        throw new Error('Please implement ViewContainerProvider ' +
                        'in your AppComponent');
      }

      this._viewContainer = viewContainer;
    }

    get viewContainer(): ViewContainerRef {
      return this._viewContainer;
    }

    constructor(
      private appRootProvider: ErrorDialogContainerProvider,
      private injector: Injector,
      private resolver: ComponentFactoryResolver
    ) {
      appRootProvider
        .container()
        .subscribe(viewContainer => this.viewContainer = viewContainer);
    }

    open(title: string, message: string, color = 'default') {
      const factory = this.resolver.resolveComponentFactory(ErrorModalDialogComponent);
      this.modal = this.viewContainer.createComponent(factory);

      this.modal.instance.title = title;
      this.modal.instance.message = message;
      this.modal.instance.color = color;

      this.modal.changeDetectorRef.detectChanges();

      this.modal.instance.close.subscribe(() => this.destroy());
    }

    private destroy() {
      this.modal.destroy();
    }

}
