import { ObservableLruCache } from './api-access/observable-lru-cache';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material';
import { MatButtonModule, MatGridListModule, MatCheckboxModule, MatExpansionModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { JsonSchemaFormModule } from 'angular2-json-schema-form';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatSelectModule } from '@angular/material';

import { HypermediaControlComponent } from './hypermedia-control/hypermedia-control.component';
import { HypermediaClientService } from './hypermedia-client.service';
import { PropertyGridComponent } from './property-grid/property-grid.component';
import { LinkViewComponent } from './link-view/link-view.component';
import { EmbeddedEntityViewComponent } from './embedded-entity-view/embedded-entity-view.component';
import { EntityViewComponent } from './entity-view/entity-view.component';
import { RawViewComponent } from './raw-view/raw-view.component';
import { ActionsViewComponent } from './actions-view/actions-view.component';
import { ParameterlessActionViewComponent } from './actions/parameterless-action-view/parameterless-action-view.component';
import { ParameterActionComponent } from './actions/parameter-action/parameter-action.component';
import { SirenDeserializer } from './siren-parser/siren-deserializer';
import { SchemaSimplifier } from './siren-parser/schema-simplifier';
import { HttpClient } from '@angular/common/http';


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
    MatTooltipModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    JsonSchemaFormModule,
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
    ActionsViewComponent,
    ParameterlessActionViewComponent,
    ParameterActionComponent,
  ],
  providers: [
    HypermediaClientService,
    ObservableLruCache,
    SirenDeserializer,
    SchemaSimplifier,
    HttpClient]
})
export class HypermediaViewModule { }
