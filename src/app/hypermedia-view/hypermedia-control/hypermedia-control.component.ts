import { HypermediaClientService, HypermediaLink } from './../hypermedia-client.service';
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
  public count: number = -1;
  private hypermediaObject$ ;

  constructor(private hypermediaClient: HypermediaClientService) { }

  ngOnInit() {

    this.hypermediaClient.getHypermediaObjectStream().subscribe((hto) => {
      this.htoClasses = hto.classes.join(',');
      this.htoLinks = hto.links;
    });

    this.hypermediaClient.enterApi();
  }

  navigateLink(hypermediaLink: HypermediaLink) {
    this.hypermediaClient.Navigate(hypermediaLink.url);
  }

}
