import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import { HttpClient as AngularHttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HypermediaClientService {

  private entryPoint = 'http://localhost:5000/entrypoint';

  private currentClientObject$: BehaviorSubject<SirenClientObject> = new BehaviorSubject<SirenClientObject>(new SirenClientObject());

  constructor(private httpClient: AngularHttpClient) { }

  getHypermediaObjectStream(): BehaviorSubject<SirenClientObject> {
    return this.currentClientObject$;
  }

  enterApi() {
    this.httpClient.get(this.entryPoint).subscribe(res => { // TODO is subscribe ok here? use pipe?
      const next = this.MapResponse(res);
      this.currentClientObject$.next(next);
    });
  }

  Navigate(url: string) {
    this.httpClient.get(url).subscribe(res => {  // TODO is subscribe ok here? use pipe?
      const next = this.MapResponse(res);
      this.currentClientObject$.next(next);
    });
  }

  private MapResponse(response: any): SirenClientObject {
    const hco = new SirenClientObject();
    hco.deserialize(response);
    return hco;
  }
}


export class SirenClientObject {
  classes: string[] = new Array<string>();
  links: HypermediaLink[] = new Array<HypermediaLink>();

  constructor() { }

  deserialize(response: any) {
    this.classes = [...(<string[]>response.class)]; // todo what if undefined
    this.links = this.deserializeLinks(response.links); // todo what if undefined
  }

  deserializeLinks(links: any[]): HypermediaLink[] {
    const result = new Array<HypermediaLink>();
    links.forEach(link => {
      result.push(new HypermediaLink([...link.rel], link.href));
    });

    return result;
  }
}

export class HypermediaLink {
  constructor(public relations: string[], public url: string) { }
}

