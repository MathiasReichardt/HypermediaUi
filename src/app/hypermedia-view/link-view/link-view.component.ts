import { HypermediaLink, HypermediaClientService } from './../hypermedia-client.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-link-view',
  templateUrl: './link-view.component.html',
  styleUrls: ['./link-view.component.scss']
})
export class LinkViewComponent implements OnInit {

  @Input() links: HypermediaLink[];

  constructor(private hypermediaClient: HypermediaClientService) { }

  ngOnInit() {
  }

  navigateLink(hypermediaLink: HypermediaLink) {
    this.hypermediaClient.Navigate(hypermediaLink.url);
  }

}
