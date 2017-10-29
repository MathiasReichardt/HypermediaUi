import { HypermediaViewModule } from './hypermedia-view/hypermedia-view.module';
import { HypermediaControlComponent } from './hypermedia-view/hypermedia-control/hypermedia-control.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ErrorDialogModule } from './error-dialog/error-dialog.module';

import { AppComponent } from './app.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
