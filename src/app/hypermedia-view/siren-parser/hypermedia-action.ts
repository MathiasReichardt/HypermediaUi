import { Observable } from 'rxjs/Observable';

export class HypermediaAction {
  public name: string;
  public classes: string[] = new Array<string>();
  public method: HttpMethodTyes;
  public href: string;
  public title: string;
  public type: string;

  public isParameterLess: boolean;
  public waheActionParameterName: string;
  public waheActionParameterClasses: string[];
  public waheActionParameterJsonSchema: Observable<object>;
  public parameters: string;

  constructor() { }
}

export enum HttpMethodTyes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}
