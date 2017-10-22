import { HypermediaClientService } from './../hypermedia-client.service';
import { Component, OnInit } from '@angular/core';
import { SirenClientObject } from '../hypermedia-client.service';

@Component({
  selector: 'app-hypermedia-control',
  templateUrl: './hypermedia-control.component.html',
  styleUrls: ['./hypermedia-control.component.scss']
})
export class HypermediaControlComponent implements OnInit {

  private htoClasses: string;

  constructor(private hypermediaClient: HypermediaClientService) { }

  ngOnInit() {
    this.hypermediaClient.enterApi().subscribe((hto) => this.htoClasses = hto.classes.join(','));
  }

}
