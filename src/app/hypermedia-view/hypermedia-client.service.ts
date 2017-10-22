import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpClient as AngularHttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HypermediaClientService {

  private entryPoint = 'http://localhost:5000/entrypoint';
  constructor(private httpClient: AngularHttpClient) { }

  enterApi  (): Observable<SirenClientObject> {
    return this.httpClient.get(this.entryPoint).pipe(
      map((response: any) => this.MapResponse(response)));
  }

  MapResponse(response: any): SirenClientObject {
    const hco = new SirenClientObject();
    hco.deserialize(response);
    return hco;
  }
}



export class SirenClientObject {
  classes: string[] = new Array<string>();
  links:

  constructor() {}

  deserialize(response: any) {
     this.classes = [...(<string[]>response.class)]; // what if undefined
  }
}

