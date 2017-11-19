import { Component, OnInit, Input } from '@angular/core';
import { EmbeddedLinkEntity } from '../siren-parser/embedded-link-entity';
import { EmbeddedEntity } from '../siren-parser/embedded-entity';

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
