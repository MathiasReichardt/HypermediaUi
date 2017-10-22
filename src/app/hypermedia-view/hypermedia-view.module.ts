import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HypermediaControlComponent } from './hypermedia-control/hypermedia-control.component';
import {MatCardModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    HypermediaControlComponent
  ],
  declarations: [HypermediaControlComponent]
})
export class HypermediaViewModule { }
