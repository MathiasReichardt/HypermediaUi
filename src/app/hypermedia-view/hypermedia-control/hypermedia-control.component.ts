import { HypermediaClientService } from './../hypermedia-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hypermedia-control',
  templateUrl: './hypermedia-control.component.html',
  styleUrls: ['./hypermedia-control.component.scss']
})
export class HypermediaControlComponent implements OnInit {

  private htoClasses: string;

  constructor(private hypermediaClient: HypermediaClientService) { }

  ngOnInit() {
    this.hypermediaClient.enterApi().subscribe((hto: any) => this.htoClasses = ((<string[]>hto.class).join(',') ));
  }

}
