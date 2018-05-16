import { Injectable } from '@angular/core';

@Injectable()
export class HypermediaVieConfiguration {
  showRawTab = true;

  showClasses = false;

  showEmptyEntities = false;

  showEmptyProperties = false;

  showEmptyLinks = false;

  showEmptyActions = false;

  useEmbeddingPropertyForActionParameters = true;
}

