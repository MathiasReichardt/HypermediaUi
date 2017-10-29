import { EmbeddedEntity, EmbeddedLinkEntity } from './../hypermedia-client.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.scss']
})
export class EntityViewComponent implements OnInit {
  @Input() embeddedLinkEntities: EmbeddedLinkEntity[];
  @Input() embeddedEntities: EmbeddedEntity[];

  constructor() { }

  ngOnInit() {
  }

}
