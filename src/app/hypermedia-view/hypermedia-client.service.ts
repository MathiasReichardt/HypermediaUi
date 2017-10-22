import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient as AngularHttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HypermediaClientService {

  private entryPoint = 'http://localhost:5000/entrypoint';
  constructor(private httpClient: AngularHttpClient) { }

  enterApi() {
    return this.httpClient.get(this.entryPoint);
  }
}
