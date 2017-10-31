import { SirenClientObject, EmbeddedLinkEntity, EmbeddedEntity, HypermediaLink, PropertyInfo } from './../hypermedia-client.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.scss']
})
export class EntityViewComponent implements OnInit, OnChanges {
  @Input() entity: SirenClientObject;

  public embeddedLinkEntities: EmbeddedLinkEntity[];
  public embeddedEntities: EmbeddedEntity[];
  public classes: string;
  public links: HypermediaLink[] = new Array<HypermediaLink>();
  public properties: PropertyInfo[] = new Array<PropertyInfo>();
  constructor() { }

  ngOnInit() {
    this.processHto();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.processHto();
  }

  private processHto() {
    this.classes = this.entity.classes.join(',');
    this.links = this.entity.links;
    this.properties = this.entity.properties;
    this.embeddedLinkEntities = this.entity.embeddedLinkEntities;
    this.embeddedEntities = this.entity.embeddedEntities;
  }

}
