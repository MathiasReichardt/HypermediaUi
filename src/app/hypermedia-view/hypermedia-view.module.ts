import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material';
import {MatButtonModule, MatGridListModule, MatCheckboxModule, MatExpansionModule} from '@angular/material';

import { HypermediaControlComponent } from './hypermedia-control/hypermedia-control.component';
import {HypermediaClientService} from './hypermedia-client.service';
import { PropertyGridComponent } from './property-grid/property-grid.component';
import { LinkViewComponent } from './link-view/link-view.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  exports: [
    HypermediaControlComponent
  ],
  declarations: [HypermediaControlComponent, PropertyGridComponent, LinkViewComponent],
  providers: [HypermediaClientService]
})
export class HypermediaViewModule { }
