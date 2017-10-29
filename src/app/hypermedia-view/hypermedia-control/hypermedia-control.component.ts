import { HypermediaClientService, HypermediaLink, PropertyInfo, PropertyTypes } from './../hypermedia-client.service';
import { Component, OnInit } from '@angular/core';
import { SirenClientObject } from '../hypermedia-client.service';


@Component({
  selector: 'app-hypermedia-control',
  templateUrl: './hypermedia-control.component.html',
  styleUrls: ['./hypermedia-control.component.scss']
})
export class HypermediaControlComponent implements OnInit {
  public htoClasses: string;
  public htoLinks: HypermediaLink[] = new Array<HypermediaLink>();
  htoProperties: PropertyInfo[]= new Array<PropertyInfo>();

  public propertyTypes = PropertyTypes;

  constructor(private hypermediaClient: HypermediaClientService) { }

  ngOnInit() {

    this.hypermediaClient.getHypermediaObjectStream().subscribe((hto) => {
      this.htoClasses = hto.classes.join(',');
      this.htoLinks = hto.links;
      this.htoProperties = hto.properties;
    });

    this.hypermediaClient.enterApi();
  }

  navigateLink(hypermediaLink: HypermediaLink) {
    this.hypermediaClient.Navigate(hypermediaLink.url);
  }

}
