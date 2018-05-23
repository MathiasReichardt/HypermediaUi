import { HypermediaClientService } from './../hypermedia-client.service';
import { Component, OnInit, Input, Renderer } from '@angular/core';
import { HypermediaLink } from '../siren-parser/hypermedia-link';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-link-view',
  templateUrl: './link-view.component.html',
  styleUrls: ['./link-view.component.scss']
})
export class LinkViewComponent implements OnInit {

  @Input() links: HypermediaLink[];

  constructor(private hypermediaClient: HypermediaClientService, private renderer: Renderer, private clipboardService: ClipboardService) { }

  ngOnInit() {
  }

  navigateLink(hypermediaLink: HypermediaLink) {
    this.hypermediaClient.Navigate(hypermediaLink.url);
  }

  copyToClipBoard(hypermediaLink: HypermediaLink) {
    this.clipboardService.copyFromContent(hypermediaLink.url, this.renderer);
  }

}
