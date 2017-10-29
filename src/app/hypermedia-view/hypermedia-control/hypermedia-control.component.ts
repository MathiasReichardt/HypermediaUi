import { HypermediaClientService, HypermediaLink, PropertyInfo,  EmbeddedEntity, EmbeddedLinkEntity } from './../hypermedia-client.service';
import { Component, OnInit } from '@angular/core';
import { SirenClientObject } from '../hypermedia-client.service';


@Component({
  selector: 'app-hypermedia-control',
  templateUrl: './hypermedia-control.component.html',
  styleUrls: ['./hypermedia-control.component.scss']
})
export class HypermediaControlComponent implements OnInit {
  public embeddedLinkEntities: EmbeddedLinkEntity[];
  public embeddedEntities: EmbeddedEntity[];
  public classes: string;
  public links: HypermediaLink[] = new Array<HypermediaLink>();
  public properties: PropertyInfo[]= new Array<PropertyInfo>();



  constructor(private hypermediaClient: HypermediaClientService) {  }

  ngOnInit() {
      this.hypermediaClient.getHypermediaObjectStream().subscribe((hto) => {
      this.classes = hto.classes.join(',');
      this.links = hto.links;
      this.properties = hto.properties;
      this.embeddedLinkEntities = hto.embeddedLinkEntities;
      this.embeddedEntities = hto.embeddedEntities;
    });

    this.hypermediaClient.enterApi();
  }



}
