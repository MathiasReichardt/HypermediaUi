import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HypermediaControlComponent } from './hypermedia-control/hypermedia-control.component';
import {MatCardModule} from '@angular/material';
import {HypermediaClientService} from './hypermedia-client.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule
  ],
  exports: [
    HypermediaControlComponent
  ],
  declarations: [HypermediaControlComponent],
  providers: [HypermediaClientService]
})
export class HypermediaViewModule { }
