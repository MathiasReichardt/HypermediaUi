import { HypermediaViewModule } from './hypermedia-view/hypermedia-view.module';
import { HypermediaControlComponent } from './hypermedia-view/hypermedia-control/hypermedia-control.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { ErrorDialogModule } from './error-dialog/error-dialog.module';

import { AppComponent } from './app.component';
import { LinkViewComponent } from './hypermedia-view/link-view/link-view.component';
import { EmptyResponseBodyErrorInterceptor } from './HttpInterceptorWorkaround';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ErrorDialogModule,
    HypermediaViewModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: EmptyResponseBodyErrorInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
