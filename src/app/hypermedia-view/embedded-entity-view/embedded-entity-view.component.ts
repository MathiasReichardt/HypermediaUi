import { EmbeddedEntity, EmbeddedLinkEntity } from './../hypermedia-client.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-embedded-entity-view',
  templateUrl: './embedded-entity-view.component.html',
  styleUrls: ['./embedded-entity-view.component.scss']
})
export class EmbeddedEntityViewComponent implements OnInit {
  @Input() embeddedLinkEntities: EmbeddedLinkEntity[];
  @Input() embeddedEntities: EmbeddedEntity[];

  constructor() { }

  ngOnInit() {
  }

}
