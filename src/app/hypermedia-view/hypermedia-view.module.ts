import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HypermediaControlComponent } from './hypermedia-control/hypermedia-control.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HypermediaControlComponent
  ],
  declarations: [HypermediaControlComponent]
})
export class HypermediaViewModule { }
