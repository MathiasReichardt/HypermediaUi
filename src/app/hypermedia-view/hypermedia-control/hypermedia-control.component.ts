import { Component, OnInit } from '@angular/core';
import { HypermediaClientService } from '../hypermedia-client.service';
import { SirenClientObject } from '../siren-parser/siren-client-object';


@Component({
  selector: 'app-hypermedia-control',
  templateUrl: './hypermedia-control.component.html',
  styleUrls: ['./hypermedia-control.component.scss']
})
export class HypermediaControlComponent implements OnInit {
  public rawResponse: object;
  public hto: SirenClientObject;

  constructor(private hypermediaClient: HypermediaClientService) {  }

  ngOnInit() {
      this.hypermediaClient.getHypermediaObjectStream().subscribe((hto) => {
      this.hto = hto;
    });

    this.hypermediaClient.getHypermediaObjectRawStream().subscribe((rawResponse) => {
      this.rawResponse = rawResponse;
    });

    this.hypermediaClient.enterApi();
  }



}
