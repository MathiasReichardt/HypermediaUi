import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatSelectModule } from '@angular/material';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatTabsModule,
  MatTooltipModule,
  MatToolbarModule
} from '@angular/material';
import { MatCardModule, MatListModule } from '@angular/material';
import { JsonSchemaFormModule, MaterialDesignFrameworkModule } from 'angular2-json-schema-form';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { ActionsViewComponent } from './actions-view/actions-view.component';
import { ParameterActionComponent } from './actions-view/parameter-action/parameter-action.component';
import { ParameterlessActionViewComponent } from './actions-view/parameterless-action-view/parameterless-action-view.component';
import { ObservableLruCache } from './api-access/observable-lru-cache';
import { EmbeddedEntityViewComponent } from './embedded-entity-view/embedded-entity-view.component';
import { EntityViewComponent } from './entity-view/entity-view.component';
import { HypermediaClientService } from './hypermedia-client.service';
import { HypermediaControlComponent } from './hypermedia-control/hypermedia-control.component';
import { HypermediaVieConfiguration } from './hypermedia-view-configuration';
import { LinkViewComponent } from './link-view/link-view.component';
import { PropertyGridComponent } from './property-grid/property-grid.component';
import { RawViewComponent } from './raw-view/raw-view.component';
import { SchemaSimplifier } from './siren-parser/schema-simplifier';
import { SirenDeserializer } from './siren-parser/siren-deserializer';
import { ClipboardModule } from 'ngx-clipboard';



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
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    MaterialDesignFrameworkModule,
    JsonSchemaFormModule.forRoot(MaterialDesignFrameworkModule),
    PrettyJsonModule,
    ClipboardModule,
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
    HttpClient,
    HypermediaVieConfiguration]
})
export class HypermediaViewModule { }
