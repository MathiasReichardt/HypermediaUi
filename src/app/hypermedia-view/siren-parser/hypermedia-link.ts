import { HypermediaElement } from './hypermedia-element';

export class HypermediaLink extends HypermediaElement {
  constructor(public relations: string[], public url: string) {
    super();
  }
}


