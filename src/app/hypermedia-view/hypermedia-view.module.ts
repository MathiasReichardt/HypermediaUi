import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';

import { HypermediaControlComponent } from './hypermedia-control/hypermedia-control.component';
import {HypermediaClientService} from './hypermedia-client.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    HypermediaControlComponent
  ],
  declarations: [HypermediaControlComponent],
  providers: [HypermediaClientService]
})
export class HypermediaViewModule { }
