import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material';
import { MatButtonModule, MatGridListModule, MatCheckboxModule, MatExpansionModule, MatTabsModule } from '@angular/material';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { HypermediaControlComponent } from './hypermedia-control/hypermedia-control.component';
import { HypermediaClientService } from './hypermedia-client.service';
import { PropertyGridComponent } from './property-grid/property-grid.component';
import { LinkViewComponent } from './link-view/link-view.component';
import { EmbeddedEntityViewComponent } from './embedded-entity-view/embedded-entity-view.component';
import { EntityViewComponent } from './entity-view/entity-view.component';
import { RawViewComponent } from './raw-view/raw-view.component';
import { ActionsViewComponent } from './actions-view/actions-view.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTabsModule,
    PrettyJsonModule
  ],
  exports: [
    HypermediaControlComponent
  ],
  declarations: [
    HypermediaControlComponent,
    PropertyGridComponent,
    LinkViewComponent,
    EmbeddedEntityViewComponent,
    EntityViewComponent,
    RawViewComponent,
    ActionsViewComponent],
  providers: [HypermediaClientService]
})
export class HypermediaViewModule { }
